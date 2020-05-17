import React, { useContext, useEffect, useState } from "react";
import { createScheduler, createWorker } from 'tesseract.js';

const ImageTextRecognitionContext = React.createContext();
ImageTextRecognitionContext.displayName = "ImageTextRecognitionContext";

export function ImageTextRecognitionProvider({ children }) {
  const [readyScheduler, setReadyScheduler] = useState();

  useEffect(() => {
    const scheduler = createScheduler();
    (async () => {
      await Promise.all([
        createWorker(),
        createWorker(),
        createWorker(),
        createWorker(),
        createWorker(),
        createWorker(),
      ].map(async worker => {
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        await worker.setParameters({
          tessjs_create_hocr: '0',
          tessjs_create_tsv: '0',
        });
        scheduler.addWorker(worker);
      }));

      setReadyScheduler(scheduler);

      return () => scheduler.terminate();
    })();
  }, []);

  return <ImageTextRecognitionContext.Provider value={readyScheduler}>
    {children}
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
      console.log(data);
    })();
    
    return () => {
      console.log("canceled");
      
      didCancel = true
    };
  }, [imageLike, options, scheduler]);

  return result;
}
