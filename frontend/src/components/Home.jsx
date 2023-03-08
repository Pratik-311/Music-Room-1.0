import React, { useEffect, useState } from "react";
import { Grid, Button, Typography, ButtonGroup } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function RenderHomePage() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} align="center">
        <Typography variant="h3" compact="h3">
          Catthew Pawrty
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <ButtonGroup disableElevation variant="outlined" color="primary">
          <Button color="primary" to="/join" component={Link}>
            Join a Room
          </Button>
          <Button color="secondary" to="/create" component={Link}>
            Create a Room
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}

export default function Home(props) {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState(null);

  const updateRoomCode = async () => {
    fetch("http://0.0.0.0/api/user-in-room")
      .then((response) => response.json())
      .then((data) => {
        setRoomCode(data.code);
      });
  };
  useEffect(() => {
    updateRoomCode();
  }, []);

  return roomCode ? navigate(`/room/${roomCode}`) : <RenderHomePage />;
}
