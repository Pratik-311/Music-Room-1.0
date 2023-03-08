import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Button, Typography } from "@mui/material";
import CreateRoomPage from "./CreateRoomPage";
import MusicPlayer from "./MusicPlayer";

export default function Room() {
  const navigate = useNavigate();

  const [roomDetails, setRoomDetails] = React.useState({
    votesToSkip: 2,
    guestCanPause: false,
    isHost: false,
    showSetting: false,
    spotifyAuthenticated: false,
    song: {},
  });

  const { roomCode } = useParams();

  function leaveButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://0.0.0.0/api/leave-room", requestOptions).then((_response) => {
      navigate("/");
    });
  }

  function settingsButtonPressed(value) {
    setRoomDetails((prevRoomDetails) => ({
      ...prevRoomDetails,
      showSetting: value,
    }));
  }

  function getRoomDetails() {
    fetch("http://0.0.0.0/api/get-room" + "?code=" + roomCode)
      .then((response) => {
        if (!response.ok) navigate("/");
        return response.json();
      })
      .then((data) => {
        setRoomDetails({
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        });
      });
  }

  function authenticateSpotify() {
    fetch("http://0.0.0.0/spotify/is-authenticated")
      .then((response) => response.json())
      .then((data) => {
        setRoomDetails((prevRoomDetails) => ({
          ...prevRoomDetails,
          spotifyAuthenticated: data.status,
        }));
        if (!data.status) {
          fetch("http://0.0.0.0/spotify/get-auth-url")
            .then((response) => response.json())
            .then((data) => {
              window.location.replace(data.url);
            });
        }
      });
  }

  function getCurrentSong() {
    fetch("http://0.0.0.0/spotify/current-song")
      .then((response) => {
        if (!response.ok) return {};
        else {
          return response.json();
        }
      })
      .then((data) => {
        // console.log('data from response', data);
        setRoomDetails((prevRoomDetails) => ({
          ...prevRoomDetails,
          song: data,
        }));
      });
  }

  useEffect(() => {
    getRoomDetails();
  }, []);

  useEffect(() => {
    if (roomDetails.isHost) {
      authenticateSpotify();
    }
  }, [roomDetails.isHost]);

  const MINUTE_MS = 6000;
  useEffect(() => {
    const interval = setInterval(() => {
      getCurrentSong();
    }, MINUTE_MS);
    return () => clearInterval(interval); 
  }, []);

  function RenderSettings() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <CreateRoomPage
            update={true}
            votesToSkip={roomDetails.votesToSkip}
            guestCanPause={roomDetails.guestCanPause}
            roomCode={roomCode}
            updateCallback={getRoomDetails}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => settingsButtonPressed(false)}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    );
  }

  function RenderSettingsButton() {
    return (
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => settingsButtonPressed(true)}
        >
          Settings
        </Button>
      </Grid>
    );
  }

  if (roomDetails.showSetting) {
    return <RenderSettings />;
  }
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h6">
          Code: {roomCode}
        </Typography>
      </Grid>
      <MusicPlayer {...roomDetails.song}/>
      {roomDetails.isHost && RenderSettingsButton()}
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={leaveButtonPressed}
        >
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );
}
