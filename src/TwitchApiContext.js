import React, { useContext } from "react";
import makeTwitchApi from "./makeTwitchApi";

const TwitchApiContext = React.createContext({
  twitchApi: makeTwitchApi("r2000vj19f088smr120ej452wxlkrt"),
});

export default TwitchApiContext;

export function useTwitchApi() {
  const { twitchApi } = useContext(TwitchApiContext);
  twitchApi.handleAuthResponse();

  return twitchApi;
}
