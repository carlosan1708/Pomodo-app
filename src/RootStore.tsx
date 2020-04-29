import React from 'react';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers, createStore } from 'redux';
import timerReducer from './reducers/TimerReducer';
import todoListReducer from './reducers/TodoReducer';

const RootStore = (props: any) => {
  const store = createStore(
    combineReducers({
      timer: timerReducer,
      todoList: todoListReducer,
    }),
    props.initialState,
    composeWithDevTools()
  );
  return <Provider store={store}>{props.children}</Provider>;
};

export default RootStore;
