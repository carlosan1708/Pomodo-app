import React, { Component, FormEvent, ChangeEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import {
  Button,
  InputAdornment,
  OutlinedInput,
  Paper,
} from '@material-ui/core';
import { ADD_TODO_TASK } from '../../actions/table/TableActionTypesKeys';
import { TRIGGER_TIMER } from '../../actions/timer/TimerActionTypeKeys';
import { AppState } from '../../actions/CombineType';
import { TimerStatus } from '../../utilities/TimerStatus';

type TodoTaskAddState = {
  inputValue: string;
};

class TodoTaskAdd extends Component<Props, TodoTaskAddState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.onTriggerTimer();
    this.props.onTodoAdded(this.state.inputValue, this.props.timerRadioOption);
    this.setState({ inputValue: '' });
  };

  handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    this.setState({ inputValue: event.target.value });
  };

  render() {
    return (
      <Paper>
        <form onSubmit={this.handleSubmit}>
          <OutlinedInput
            disabled={this.props.isTimerOn}
            fullWidth
            color="secondary"
            id="standard-adornment-password"
            value={this.state.inputValue}
            onChange={this.handleChange}
            endAdornment={
              <InputAdornment position="end">
                <Button
                  disabled={this.props.isTimerOn}
                  aria-label="toggle password visibility"
                  type="submit"
                  variant="contained"
                  color="secondary"
                >
                  Add Task
                </Button>
              </InputAdornment>
            }
          />
        </form>
      </Paper>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onTodoAdded: (todoTaskText: string, timerRadioOption: number) =>
      dispatch({
        type: ADD_TODO_TASK,
        payload: {
          todoTask: todoTaskText,
          creationTime: new Date(),
          scheduleTime: timerRadioOption,
          status: TimerStatus.InProgress,
        },
      }),
    onTriggerTimer: () =>
      dispatch({
        type: TRIGGER_TIMER,
        payload: {
          status: TimerStatus.InProgress,
          isTimerOn: true,
        },
      }),
  };
};

const mapStateToProps = (state: AppState) => {
  return {
    timerRadioOption: state.timer.timerRadioOption,
    isTimerOn: state.timer.isTimerOn,
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  onTodoAdded: (todoTaskText: string, timerRadioOption: any) => any;
  onTriggerTimer: () => any;
};

export default connector(TodoTaskAdd);
