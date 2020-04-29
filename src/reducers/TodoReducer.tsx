import { TableState, TodoActionTypes } from '../actions/table/TableActionTypes';

import {
  ADD_TODO_TASK,
  UPDATE_TODO_TASK,
} from '../actions/table/TableActionTypesKeys';

const initialState: TableState = {
  tableContent: [],
};

export default (state = initialState, action: TodoActionTypes): TableState => {
  switch (action.type) {
    case ADD_TODO_TASK:
      return {
        ...state,
        tableContent: [action.payload, ...state.tableContent],
      };
    case UPDATE_TODO_TASK:
      return {
        ...state,
        tableContent: state.tableContent.map((element, i) =>
          i === 0 ? { ...element, status: action.status } : element
        ),
      };
    default:
      return state;
  }
};
