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
  const [selectedNames, setSelectedNames] = useState(new Set([]))
  const [games, setGames] = useState([]);
  const [gameIdToName, setGameIdToName] = useState(new Map());
  const [streams, setStreams] = useState([]);
  const [fetchNext, setFetchNext] = useState(() => () => undefined);

  useEffect(() => {
    if (!selectedNames.size) {
      setGames([]);
      setGameIdToName(new Map());
      return;
    }

    let didCancel = false;
    (async () => {
      const incGames = await api.getGames(selectedNames);
      if (didCancel) return;

      setGames(incGames);
      setGameIdToName(new Map(incGames.map(({ id, name }) => [id, name])));
    })();

    return () => didCancel = true;
  }, [api, selectedNames])

  useEffect(() => {
    if (!games.length) {
      setStreams([]);
      setFetchNext(() => () => undefined);
      return;
    }

    let didCancel = false;
    (async () => {
      const result = await api.getStreams(games.map(g => g.id));
      if (didCancel) return;
      
      handleResult(result);
    })();

    function handleResult(result, concat = false) {
      concat
        ? setStreams(prev => uniqueIds([...prev, ...result.streams]))
        : setStreams(result.streams);
      setFetchNext(() => async () => handleResult(await result.fetchNext(), true));
    }

    return () => didCancel = true;
  }, [api, games]);

  return <>
    <GamesSelector
      names={GAME_NAMES}
      selectedNames={selectedNames}
      onCheckboxChange={onGameSelectChange}
    />
    <div>Checking {streams.length} streams…</div>
    <ImageTextRecognitionProvider>
      <div style={{display: "flex", flexWrap: "wrap"}}>
        {streams.map(stream => <Stream key={stream.id} stream={stream} gameName={gameIdToName.get(stream.game_id)} />)}
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
