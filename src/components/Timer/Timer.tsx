import React, { Component } from 'react';

import { connect, ConnectedProps } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import TimerRadioOptions from './TimerRadioOptions';

import {
  PERSIST_RADIO_TIMER,
  TRIGGER_TIMER,
} from '../../actions/timer/TimerActionTypeKeys';

import { AppState } from '../../actions/CombineType';
import { TimerSharedState } from '../../actions/timer/TimerActionType';
import { UPDATE_TODO_TASK } from '../../actions/table/TableActionTypesKeys';
import { TimerStatus } from '../../utilities/TimerStatus';
import TimerControlOptions from './TimerControlOptions';

export type TimeDisplay = {
  hours: number;
  minutes: number;
  seconds: number;
};

export type TimerState = {
  time: TimeDisplay;
  totalSeconds: number;
  initiated: boolean;
};

class Timer extends Component<Props, TimerState> {
  timer: any;

  url: string;

  audio: HTMLAudioElement;

  constructor(props: Props) {
    super(props);
    this.state = {
      time: {
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      totalSeconds: 900,
      initiated: false,
    };
    this.timer = 0;
    this.url = 'http://streaming.tdiradio.com:8000/house.mp3';
    this.audio = new Audio(this.url);
  }

  componentDidMount() {
    const timeLeftVar = this.secondsToTime(this.state.totalSeconds);
    this.setState((previousState) => ({
      ...previousState,
      time: {
        ...timeLeftVar,
      },
    }));
  }

  componentDidUpdate(prevProps: Props) {
    if (
      prevProps.isTimerOn !== this.props.isTimerOn &&
      this.props.isTimerOn &&
      this.props.status === TimerStatus.InProgress
    ) {
      this.startTimer();
    }
  }

  secondsToTime = (secs: number): TimeDisplay => {
    const hoursVal = Math.floor(secs / (60 * 60));

    const divisorForMinutes = secs % (60 * 60);
    const minutesVal = Math.floor(divisorForMinutes / 60);

    const divisorForSeconds = divisorForMinutes % 60;
    const secondsVal = Math.ceil(divisorForSeconds);

    const result = {
      hours: hoursVal,
      minutes: minutesVal,
      seconds: secondsVal,
    };

    return result;
  };

  startTimer = () => {
    if (this.timer === 0 && this.state.totalSeconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
      this.props.onTriggerTimer(TimerStatus.InProgress, true);
      this.props.onTimerUpdateTodo(TimerStatus.InProgress);
    }
  };

  pauseTimer = () => {
    if (this.timer !== 0 && this.state.totalSeconds > 0) {
      this.clearTimer();
      this.setState({ initiated: true });
      this.triggerActionWithTodoUpdate(TimerStatus.Paused, false);
    }
  };

  cancelTimer = () => {
    if (this.state.totalSeconds > 0) {
      this.clearTimer();
      this.triggerActionWithTodoUpdate(TimerStatus.Canceled, false);
      const timeLeftVar = this.secondsToTime(this.props.timerRadioOption * 60);
      this.setState({ time: timeLeftVar, initiated: false });
    }
  };

  triggerActionWithTodoUpdate = (newStatus: string, isTimerOn: boolean) => {
    this.props.onTriggerTimer(newStatus, isTimerOn);
    this.props.onTimerUpdateTodo(newStatus);
  };

  clearTimer = () => {
    clearInterval(this.timer);
    this.timer = 0;
  };

  onChangeRadioTimer = (minutes: number) => {
    this.clearTimer();
    const newTotalSecs = minutes * 60;
    const timeLeftVar = this.secondsToTime(minutes * 60);

    this.setState({ time: timeLeftVar, totalSeconds: newTotalSecs });
    this.props.onTimeSet(minutes);
  };

  countDown = () => {
    // Remove one second, set state so a re-render happens.
    const totalSecondsMinus = this.state.totalSeconds - 1;

    this.setState((previousState) => ({
      ...previousState,
      time: {
        ...this.secondsToTime(totalSecondsMinus),
      },
      totalSeconds: totalSecondsMinus,
    }));

    // Check if we're at zero.
    if (totalSecondsMinus === 0) {
      this.clearTimer();
      const timeLeftVar = this.secondsToTime(this.props.timerRadioOption * 60);
      this.setState({
        time: timeLeftVar,
        initiated: false,
        totalSeconds: this.props.timerRadioOption * 60,
      });
      this.triggerActionWithTodoUpdate(TimerStatus.Completed, false);
      this.audio.play();
      setTimeout(() => {
        this.audio.pause();
      }, 10000);
    }
  };

  render() {
    return (
      <Card>
        <CardContent>
          <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justify="center"
          >
            <Grid item xs={5} sm={4} md={4} lg={4} xl={4}>
              <Typography variant="h1" component="h2">
                {this.state.time.minutes}:{this.state.time.seconds}
              </Typography>
            </Grid>
            {(this.props.isTimerOn || this.state.initiated) && (
              <TimerControlOptions
                startTimer={this.startTimer}
                pauseTimer={this.pauseTimer}
                cancelTimer={this.cancelTimer}
              />
            )}
            <Grid item xs={5} sm={4} md={4} lg={3} xl={3}>
              <TimerRadioOptions
                timerVal={this.props.timerRadioOption}
                onChangeRadioTimer={this.onChangeRadioTimer}
                isDisable={this.props.isTimerOn}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = (state: AppState): TimerSharedState => {
  return {
    timerRadioOption: state.timer.timerRadioOption,
    isTimerOn: state.timer.isTimerOn,
    status: state.timer.status,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onTimeSet: (timerRadioOption: number) =>
      dispatch({
        type: PERSIST_RADIO_TIMER,
        timerRadioOption,
      }),
    onTriggerTimer: (status: string, isTimerOn: boolean) =>
      dispatch({ type: TRIGGER_TIMER, payload: { status, isTimerOn } }),
    onTimerUpdateTodo: (status: string) =>
      dispatch({ type: UPDATE_TODO_TASK, status }),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  onTimeSet: (timerRadioOption: number) => any;
  onTriggerTimer: (status: string, isTimerOn: boolean) => any;
  onTimerUpdateTodo: (status: string) => any;
};

export default connector(Timer);
