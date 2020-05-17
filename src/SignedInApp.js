import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import GamesSelector from "./GamesSelector";
import Stream from "./Stream";
import { useTwitchApi } from "./TwitchApiContext";
import { ImageTextRecognitionProvider } from "./useImageTextRecognition";

const GAME_NAMES = [
  "DRAWFUL 2",
  "THE JACKBOX PARTY PACK",
  "THE JACKBOX PARTY PACK 2",
  "THE JACKBOX PARTY PACK 3",
  "THE JACKBOX PARTY PACK 4",
  "THE JACKBOX PARTY PACK 5",
  "THE JACKBOX PARTY PACK 6",
];

export default function SignedInApp() {
  const api = useTwitchApi();
  const [selectedNames, setSelectedNames] = useState(new Set(["DRAWFUL 2"]))
  const [streams, setStreams] = useState([]);
  const [fetchNext, setFetchNext] = useState(() => () => { });

  useEffect(() => {
    let didCancel = false;
    (async () => {
      const gameIds = await api.getGameIds(selectedNames);
      const result = await api.getStreams(gameIds);
      if (didCancel) return;
      
      console.log(result.streams);
      handleResult(result);
    })();

    function handleResult(result, concat = false) {
      concat
        ? setStreams(prev => uniqueIds([...prev, ...result.streams]))
        : setStreams(result.streams);
      setFetchNext(() => async () => handleResult(await result.fetchNext(), true));
    }

    return () => didCancel = true;
  }, [api, selectedNames]);

  return <>
    <GamesSelector
      names={GAME_NAMES}
      selectedNames={selectedNames}
      onCheckboxChange={onGameSelectChange}
    />
    <ImageTextRecognitionProvider>
      <div style={{display: "flex", flexWrap: "wrap"}}>
        {streams.map(stream => <Stream key={stream.id} stream={stream} />)}
      </div>
    </ImageTextRecognitionProvider>
    <Button variant="contained" size="large" color="primary" onClick={fetchNext} style={{ position: "fixed", bottom: 0 }}>
      SHOW ME MOAR
    </Button>
  </>;

  function onGameSelectChange({ name, checked }) {
    setSelectedNames(prevNames => {
      const names = new Set(prevNames);
      checked ? names.add(name) : names.delete(name);

      return names;
    });
  }
}

function uniqueIds(items) {
  const idToItem = new Map();
  for (const item of items) {
    idToItem.set(item.id, item);
  }

  return [...idToItem.values()];
}
