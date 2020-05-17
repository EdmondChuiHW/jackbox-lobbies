import React, { useContext, useEffect, useState } from "react";
import createCancelableScheduler from "./createCancelableScheduler";

const ImageTextRecognitionContext = React.createContext();
ImageTextRecognitionContext.displayName = "ImageTextRecognitionContext";

export function ImageTextRecognitionProvider({ children, numWorkers = 20 }) {
  const [readyScheduler, setReadyScheduler] = useState();

  useEffect(() => {
    const scheduler = createCancelableScheduler({workersPoolSize: numWorkers});
    scheduler.init();
    setReadyScheduler(scheduler);
  }, [numWorkers]);

  return <ImageTextRecognitionContext.Provider value={readyScheduler}>
    {readyScheduler && children}
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
