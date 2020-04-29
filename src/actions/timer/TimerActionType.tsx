import { PERSIST_RADIO_TIMER, TRIGGER_TIMER } from './TimerActionTypeKeys';

export type TimerSharedState = {
  timerRadioOption: number;
  isTimerOn: boolean;
  status: string;
};

export type TimerOnTodo = {
  status: string;
  isTimerOn: boolean;
};

export type PersistTimerRadioAction = {
  timerRadioOption: number;
  type: typeof PERSIST_RADIO_TIMER;
};

export type TimerAction = {
  type: typeof TRIGGER_TIMER;
  payload: TimerOnTodo;
};

export type TimerActionTypes = PersistTimerRadioAction | TimerAction;
