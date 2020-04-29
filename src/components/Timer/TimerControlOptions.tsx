import React from 'react';
import { Grid, IconButton } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import CancelIcon from '@material-ui/icons/Cancel';

type TimerControlOptionsProps = {
  startTimer: () => void;
  pauseTimer: () => void;
  cancelTimer: () => void;
};

const TimerControlOptions = (props: TimerControlOptionsProps) => {
  return (
    <Grid item xs={2} sm={3} md={4} lg={4} xl={4}>
      <IconButton onClick={props.startTimer} aria-label="play">
        <PlayArrowIcon />
      </IconButton>
      <IconButton onClick={props.pauseTimer} aria-label="pause">
        <PauseIcon />
      </IconButton>
      <IconButton onClick={props.cancelTimer} aria-label="cancel">
        <CancelIcon />
      </IconButton>
    </Grid>
  );
};

export default TimerControlOptions;
