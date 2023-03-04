import React, { useState } from "react";
import { TextField, Button, Typography, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function RoomJoinPage(props) {
  const navigate = useNavigate();
  const [joinRoomDetails, setJoinRoomDetails] = useState({
    roomCode: "",
    error: "",
  });

  function handleTextFieldChange(event) {
    setJoinRoomDetails((prevJoinRoomDetails) => ({
      ...prevJoinRoomDetails,
      roomCode: event.target.value,
    }));
  }

  function roomButtonPressed(event) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: joinRoomDetails.roomCode,
      }),
    };
    fetch("/api/join-room", requestOptions)
      .then((response) => {
        if (response.ok) {
          navigate(`/room/${joinRoomDetails.roomCode}`);
        } else {
          setJoinRoomDetails((prevJoinRoomDetails) => ({
            ...prevJoinRoomDetails,
            error: "Room Not Found",
          }));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Join a Room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <TextField
          error={joinRoomDetails.error}
          label="Code"
          placeholder="Enter a Room Code"
          value={joinRoomDetails.roomCode}
          helperText={joinRoomDetails.error}
          variant="outlined"
          onChange={handleTextFieldChange}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="primary" onClick={roomButtonPressed}>
          Enter Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
}
