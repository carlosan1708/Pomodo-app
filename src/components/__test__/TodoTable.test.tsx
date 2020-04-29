import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import App from '../App';
import TodoTable from '../Table/TodoTable';
import RootStore from '../../RootStore';
import { TimerStatus } from '../../utilities/TimerStatus';
import { MTableBodyRow } from 'material-table';

describe('<TodoTable/>', () => {
  let wrapped: any;

  const initialState = {
    todoList: {
      tableContent: [
        {
          todoTask: 'Test',
          creationTime: new Date('2020-04-29T23:04:38.387Z'),
          scheduleTime: 15,
          status: TimerStatus.InProgress,
        },
        {
          todoTask: 'Test2',
          creationTime: new Date('2020-04-29T23:04:38.387Z'),
          scheduleTime: 11,
          status: TimerStatus.InProgress,
        },
      ],
    },
  };
  beforeAll(() => {
    const mount = createMount();
    wrapped = mount(
      <RootStore initialState={initialState}>
        <TodoTable />
      </RootStore>
    );
  });

  afterAll(() => {
    wrapped.cleanUp();
  });

  it('should have two rows in snapshot', () => {
    expect(wrapped.find(MTableBodyRow).length).toEqual(2);
  });

  it('should contained the data passed', () => {
    expect(wrapped).toMatchSnapshot();
  });
});
