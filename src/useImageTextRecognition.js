import { LinearProgress, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { createScheduler, createWorker, setLogging } from 'tesseract.js';

setLogging(true);
const ImageTextRecognitionContext = React.createContext();
ImageTextRecognitionContext.displayName = "ImageTextRecognitionContext";

export function ImageTextRecognitionProvider({ children, numWorkers = 15 }) {
  const [readyScheduler, setReadyScheduler] = useState();
  const [workersReadyCount, setWorkersReadyCount] = useState(0);

  useEffect(() => {
    setWorkersReadyCount(0);
    const scheduler = createScheduler();
    (async () => {
      await Promise.all(Array(numWorkers).fill().map(() => createWorker()).map(async worker => {
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        await worker.setParameters({
          tessjs_create_hocr: '0',
          tessjs_create_tsv: '0',
        });
        scheduler.addWorker(worker);

        setWorkersReadyCount(prevCount => prevCount + 1);
      }));

      setReadyScheduler(scheduler);
    })();

    return () => scheduler.terminate();
  }, [numWorkers]);

  return <ImageTextRecognitionContext.Provider value={readyScheduler}>
    {readyScheduler
      ? children
      : (
        <>
          <LinearProgress value={(workersReadyCount / numWorkers) * 100} variant="determinate" />
          <Typography variant="h5">Loading image recognition magic…</Typography>
        </>
      )
    }
  </ImageTextRecognitionContext.Provider>;
};

export default function useImageTextRecognition(imageLike, options) {
  const scheduler = useContext(ImageTextRecognitionContext);
  const [result, setResult] = useState();

  useEffect(() => {
    if (!scheduler || !imageLike) return;
    
    let didCancel = false;
    (async () => {
      const { data } = await scheduler.addJob('recognize', imageLike, options);
      if (didCancel) return;

      setResult(data);
    })();
    
    return () => {
      console.log("canceled");
      
      didCancel = true
    };
  }, [imageLike, options, scheduler]);

  return result;
}
