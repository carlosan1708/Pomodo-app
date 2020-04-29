import { ADD_TODO_TASK } from '../../actions/table/TableActionTypesKeys';
import { TimerStatus } from '../../utilities/TimerStatus';
import todoListReducer from '../../reducers/TodoReducer';
import {
  TableState,
  AddTodoAction,
  TodoTask,
} from '../../actions/table/TableActionTypes';

describe('<TimerReducer/>', () => {
  it('Handle ADD_TODO_TASK action', () => {
    const todoTask: TodoTask = {
      todoTask: 'Test',
      creationTime: new Date(),
      scheduleTime: 15,
      status: TimerStatus.InProgress,
    };

    const todoTask2: TodoTask = {
      todoTask: 'Test',
      creationTime: new Date(),
      scheduleTime: 15,
      status: TimerStatus.InProgress,
    };

    const action: AddTodoAction = {
      type: ADD_TODO_TASK,
      payload: todoTask,
    };
    const action2: AddTodoAction = {
      type: ADD_TODO_TASK,
      payload: todoTask2,
    };

    const initialState: TableState = {
      tableContent: [],
    };

    let newState = todoListReducer(initialState, action);
    newState = todoListReducer(newState, action2);

    expect(newState).toEqual({ tableContent: [todoTask, todoTask2] });
  });
});
