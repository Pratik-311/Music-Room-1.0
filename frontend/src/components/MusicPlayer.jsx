import React from "react";
import {
  Grid,
  Typography,
  Card,
  IconButton,
  LinearProgress,
} from "@mui/material";
import { PlayArrow, SkipNext, Pause } from "@mui/icons-material";

function pauseSong() {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  };
  fetch("http://0.0.0.0/spotify/pause", requestOptions);
}

function playSong() {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  };
  fetch("http://0.0.0.0/spotify/play", requestOptions);
}

function skipSong() {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  };
  fetch("http://0.0.0.0/spotify/skip", requestOptions);
}

export default function MusicPlayer(props) {
  const songProgress = (props.time / props.duration) * 100;
  return (
    <Card>
      <Grid container alignItems="center">
        <Grid item align="center" xs={4}>
          <img src={props.image_url} height="100%" width="100%" />
        </Grid>
        <Grid item align="center" xs={8}>
          <Typography component="h5" variant="h5">
            {props.title}
          </Typography>
          <Typography color="textSecondary" variant="subtitle1">
            {props.artist}
          </Typography>
          <div>
            <IconButton
              onClick={() => {
                props.is_playing ? pauseSong() : playSong();
              }}
            >
              {props.is_playing ? <Pause /> : <PlayArrow />}
            </IconButton>
            <IconButton onClick={() => skipSong()}> 
              <SkipNext /> {props.votes} / {props.votes_required}
            </IconButton>
          </div>
        </Grid>
      </Grid>
      <LinearProgress variant="determinate" value={songProgress} />
    </Card>
  );
}
