import { Container, LinearProgress, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { createScheduler, createWorker, setLogging } from 'tesseract.js';

setLogging(true);
const ImageTextRecognitionContext = React.createContext();
ImageTextRecognitionContext.displayName = "ImageTextRecognitionContext";

export function ImageTextRecognitionProvider({ children, numWorkers = 20 }) {
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
          <Container maxWidth="sm">
            <LinearProgress value={(workersReadyCount / numWorkers) * 100} variant="determinate" />
            <img src={process.env.PUBLIC_URL + "/loading_workers.svg"} alt="Loading…" width="50%" style={{margin: 16}} />
            <Typography variant="h6">Loading image recognition magic…</Typography>
          </Container>
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
