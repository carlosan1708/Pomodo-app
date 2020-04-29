import { ADD_TODO_TASK, UPDATE_TODO_TASK } from './TableActionTypesKeys';

export type TodoTask = {
  todoTask: string;
  creationTime: Date;
  scheduleTime: number;
  status: string;
};

export type TableState = {
  tableContent: TodoTask[];
};

export type AddTodoAction = {
  type: typeof ADD_TODO_TASK;
  payload: TodoTask;
};

export type UpdateTodoAction = {
  type: typeof UPDATE_TODO_TASK;
  status: string;
};

export type TodoActionTypes = AddTodoAction | UpdateTodoAction;
