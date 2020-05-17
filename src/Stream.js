import { LinearProgress } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from "react";
import useImageTextRecognition from "./useImageTextRecognition";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
  },
  media: {
    width: 480,
    height: 270,
  },
}));

export default function Stream({ stream, gameName }) {
  const classes = useStyles();
  const { blob, imgSrc } = useImgFetch(stream.thumbnail_url);
  const result = useImageTextRecognition(blob);
  const isResultPending = !result;
  const isLikelyLobby = result?.lines.some(l => l.text.match(/everybody|to start|same players|room|on your/i));

  if (!isResultPending && !isLikelyLobby) return <></>;

  const twitchStreamUrl = `https://twitch.tv/${stream.user_name.toLowerCase()}`;

  return <>
    <Card className={classes.root} style={{ opacity: isLikelyLobby ? 1 : 0.3, order: isLikelyLobby ? 0 : 1 }}>
      <CardActionArea href={twitchStreamUrl} target="_blank" rel="noopener noreferrer">
        <CardMedia
          className={classes.media}
          image={imgSrc || "https://via.placeholder.com/480x270?text=%E2%80%A6"}
          title={`Click to watch ${stream.user_name} on Twitch`}
        />
        {isResultPending && <LinearProgress />}
        <CardContent style={{display: "flex", flexDirection: "row"}}>
          <Typography variant="body1" color="textSecondary" component="span">
            {gameName || stream.user_name}
          </Typography>
          <span style={{flex: 1}}/>
          <Typography variant="body1" color="textSecondary" component="span">
            watching now: {stream.viewer_count}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </>;
}

function useImgFetch(thumbnailUrl) {
  const [result, setResult] = useState({});

  useEffect(() => {
    if (!thumbnailUrl) return;

    let didCancel = false;
    (async () => {
      const result = await fetchImg(thumbnailUrl);
      if (didCancel) return;

      setResult(result);
    })();

    return () => didCancel = true;
  }, [thumbnailUrl]);

  return result;
}

const MAX_ACCEPTABLE_AGE_IN_SECONDS = 20;
const MAX_RETRIES = 8;
async function fetchImg(thumbnailUrl, width = 1920, height = 1080, retryCount = 0) {
  const url = thumbnailUrl.replace("{width}", width).replace("{height}", height);
  const resp = await fetch(url, {cache: "reload"});
  const isCached = ageOfResourceInSeconds(resp.headers) > MAX_ACCEPTABLE_AGE_IN_SECONDS;

  console.log(retryCount);
  if (isCached && retryCount < MAX_RETRIES) return fetchImg(thumbnailUrl, width + 1, height, retryCount + 1);

  const blob = await resp.blob();
  const imgSrc = window.URL.createObjectURL(blob);

  return { blob, imgSrc };
}

function getMaxAgeInSeconds(headers) {
  const defaultAgeInSeconds = 300;
  const cacheControl = headers.get("cache-control");
  if (!cacheControl) return defaultAgeInSeconds;

  const maxAgeStr = new URLSearchParams(cacheControl).get("max-age");
  if (!maxAgeStr) return defaultAgeInSeconds;

  return +maxAgeStr;
}

function ageOfResourceInSeconds(headers) {
  const maxAgeInMs = getMaxAgeInSeconds(headers) * 1000;
  const expiryInMs = new Date(headers.get("expires") || Date.now()).getTime();
  const resourceCreatedAt = expiryInMs - maxAgeInMs;
  const timeNow = Date.now();

  return (timeNow - resourceCreatedAt) / 1000;
}
