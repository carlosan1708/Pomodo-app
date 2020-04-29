import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import App from '../App';
import Timer from '../Timer/Timer';
import TodoTable from '../Table/TodoTable';
import RootStore from '../../RootStore';

describe('<App/>', () => {
  let wrapped: any;

  beforeAll(() => {
    const mount = createMount();
    wrapped = mount(
      <RootStore>
        <App />
      </RootStore>
    );
  });

  afterAll(() => {
    wrapped.cleanUp();
  });

  it('should mount Timer', () => {
    expect(wrapped.find(Timer).length).toEqual(1);
  });

  it('should mount TodoTable', () => {
    expect(wrapped.find(TodoTable).length).toEqual(1);
  });
});
