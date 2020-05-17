import { Container, LinearProgress, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { setLogging } from 'tesseract.js';
import createCancelableScheduler from "./createCancelableScheduler";

setLogging(true);
const ImageTextRecognitionContext = React.createContext();
ImageTextRecognitionContext.displayName = "ImageTextRecognitionContext";

export function ImageTextRecognitionProvider({ children, numWorkers = 20 }) {
  const [readyScheduler, setReadyScheduler] = useState();
  const [workersReadyCount, setWorkersReadyCount] = useState(0);

  useEffect(() => {
    setWorkersReadyCount(0);
    const scheduler = createCancelableScheduler({workersPoolSize: numWorkers});
    (async () => {
      await scheduler.init();

      setReadyScheduler(scheduler);
    })();
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
    const [resultPromise, cancelFn] = scheduler.addRecognitionJob(imageLike, options);

    (async () => {
      const { data } = await resultPromise;
      if (didCancel) return;

      setResult(data);
    })();
    
    return () => {
      didCancel = true;
      cancelFn();
    };
  }, [imageLike, options, scheduler]);

  return result;
}
