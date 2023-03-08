import React from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  FormHelperText,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  Collapse,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function CreateRoomPage({
    votesToSkip = 2,
    guestCanPause = true,
    update = false,
    roomCode = null,
    updateCallback = () => {}, 
}) {
  const navigate = useNavigate();
  const [roomCreationDetails, setRoomCreationDetails] = React.useState({
    guestCanPause: guestCanPause,
    votesToSkip: votesToSkip,
    updateSuccessMessage: "",
    updateErrorMessage: "",
  });

  function handleFormChange(event) {
    const { name, value } = event.target;
    setRoomCreationDetails((prevRoomCreationDetails) => ({
      ...prevRoomCreationDetails,
      [name]: value,
    }));
  }

  function handleRoomButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: roomCreationDetails.votesToSkip,
        guest_can_pause: roomCreationDetails.guestCanPause,
      }),
    };
    fetch("http://0.0.0.0/api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => navigate(`/room/${data.code}`));
  }

  function handleUpdateButtonPressed() {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: roomCreationDetails.votesToSkip,
        guest_can_pause: roomCreationDetails.guestCanPause,
        code: roomCode,
      }),
    };
    fetch("http://0.0.0.0/api/update-room", requestOptions).then((response) => {
      if (response.ok) {
        setRoomCreationDetails((prevRoomCreationDetails) => ({
          ...prevRoomCreationDetails,
          updateSuccessMessage: "Room Updated Successfully!",
        }));
      } else {
        setRoomCreationDetails((prevRoomCreationDetails) => ({
          ...prevRoomCreationDetails,
          updateErrorMessage: "Error in Updating Room...",
        }));
      }
      updateCallback();
    });
  }

  function RenderBackButton() {
    return (
      <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    );
  }

  function RenderUpdateButton() {
    return (
      <Grid item xs={12} align="center">
        <Button
          color="primary"
          variant="contained"
          onClick={handleUpdateButtonPressed}
        >
          Update
        </Button>
      </Grid>
    );
  }

  function RenderCreateButton() {
    return (
      <Grid item xs={12} align="center">
        <Button
          color="primary"
          variant="contained"
          onClick={handleRoomButtonPressed}
        >
          Make a Room
        </Button>
      </Grid>
    );
  }
  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item xs={12} align="center">
        <Collapse
          in={
            roomCreationDetails.updateErrorMessage != "" ||
            roomCreationDetails.updateSuccessMessage != ""
          }
        >
          {roomCreationDetails.updateErrorMessage != "" ? (
            <Alert
              severity="success"
              onClose={() =>
                setRoomCreationDetails((prevRoomCreationDetails) => ({
                  ...prevRoomCreationDetails,
                  updateSuccessMessage: "",
                }))
              }
            >
              {roomCreationDetails.updateSuccessMessage}
            </Alert>
          ) : (
            <Alert
              severity="error"
              onClose={() =>
                setRoomCreationDetails((prevRoomCreationDetails) => ({
                  ...prevRoomCreationDetails,
                  updateErrorMessage: "",
                }))
              }
            >
              {roomCreationDetails.updateErrorMessage}
            </Alert>
          )}
        </Collapse>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          {update ? "Update Room" : "Create A Room"}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <RadioGroup
            row
            name="guestCanPause"
            value={roomCreationDetails.guestCanPause}
            onChange={handleFormChange}
            // defaultValue="true"
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="false"
              control={<Radio color="secondary" />}
              label="No Control"
              labelPlacement="bottom"
            />
          </RadioGroup>
          <FormHelperText>Guest Control of Playback State</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField
            required={true}
            type="number"
            name="votesToSkip"
            value={roomCreationDetails.votesToSkip}
            onChange={handleFormChange}
            inputProps={{
              min: 1,
              style: { textAlign: "center" },
            }}
          />
          <FormHelperText>Votes Required To Skip Song</FormHelperText>
        </FormControl>
      </Grid>
      {update ? RenderUpdateButton() : RenderCreateButton()}
      {!update && RenderBackButton()}
    </Grid>
  );
}
