import { createWorker } from "tesseract.js";

let jobsCount = 0;

export default function createCancelableScheduler({ workersPoolSize = 20 } = {}) {
  const jobIdToWorkerId = new Map();
  const workersPool = makeWorkersPool();

  return {
    async init() {
      await workersPool.init(workersPoolSize);
    },
    addRecognitionJob(imageLike, options, jobId) {
      jobId = jobId || `job-${jobsCount++}`;

      async function queueJob() {
        const worker = await workersPool.getIdleWorker();        
        jobIdToWorkerId.set(jobId, worker.id);

        try {
          await worker.recognize(imageLike, options, jobId);
          return await worker.recognize(imageLike, options, jobId + "dup");
        } finally {
          jobIdToWorkerId.delete(jobId);
          workersPool.freeWorkerId(worker.id);
        }
      }

      async function terminateFn() {
        if (!jobIdToWorkerId.has(jobId)) return;

        const workerId = jobIdToWorkerId.get(jobId);
        jobIdToWorkerId.delete(jobId);
        await workersPool.killWorkerId(workerId);
      }

      return [queueJob(), terminateFn];
    },
    async terminate() {
      jobIdToWorkerId.clear();
      await workersPool.terminate();
    },
  };
}

function makeWorkersPool() {
  const workerIdToWorker = new Map();
  const idleWorkerIds = new Set();
  const idleWorkerListenersQueue = makeQueue();

  return {
    async init(workersPoolSize = 1) {
      return Promise.all(Array(workersPoolSize).fill().map(addWorker));
    },
    async getIdleWorker() {
      for (const id of idleWorkerIds) {
        return markWorkerIdBusy(id);
      }

      return new Promise(resolve => idleWorkerListenersQueue.add(w => {
        resolve(w);
      }));
    },
    async killWorkerId(workerId, skipReplacement = false) {
      if (!workerIdToWorker.has(workerId)) return;
      
      const worker = workerIdToWorker.get(workerId);
      workerIdToWorker.delete(worker.id);
      idleWorkerIds.delete(worker.id);
      
      await worker.terminate();
      if (skipReplacement) return;

      await addWorker();
    },
    freeWorkerId(workerId) {
      if (!workerIdToWorker.has(workerId)) return;

      idleWorkerIds.add(workerId);
      
      if (!idleWorkerListenersQueue.length) return;
      const listener = idleWorkerListenersQueue.pop();
      listener(markWorkerIdBusy(workerId));
    },
    async terminate() {
      idleWorkerIds.clear();
      idleWorkerListenersQueue.clear();
      const workers = [...workerIdToWorker.values()];
      workerIdToWorker.clear();

      return await Promise.all(workers.map(worker => worker.terminate()));
    },
  }

  async function addWorker() {
    const worker = createWorker();
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    await worker.setParameters({
      tessjs_create_hocr: '0',
      tessjs_create_tsv: '0',
    });
    workerIdToWorker.set(worker.id, worker);
    idleWorkerIds.add(worker.id);

    return worker;
  }

  function markWorkerIdBusy(workerId) {
    const worker = workerIdToWorker.get(workerId);
    idleWorkerIds.delete(workerId);

    return worker;
  }
}

function makeQueue() {
  let head = undefined;
  let tail = undefined;
  let length = 0;

  return {
    add(value) {
      const node = { value };
      if (!head) head = node;
      if (!tail) tail = node;

      tail.next = node;
      tail = node;

      length += 1;
    },
    pop() {
      if (!head) return head;

      const returning = head;
      head = head.next;
      if (!head) tail = undefined;
      length -= 1;

      return returning.value;
    },
    clear() {
      head = undefined;
      tail = undefined;
      length = 0;
    },
    peek: () => head?.value,
    get length() { return length },
  }
}
