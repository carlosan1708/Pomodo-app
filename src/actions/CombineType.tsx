import { TableState } from './table/TableActionTypes';
import { TimerSharedState } from './timer/TimerActionType';

export type AppState = {
  timer: TimerSharedState;
  todoList: TableState;
};
