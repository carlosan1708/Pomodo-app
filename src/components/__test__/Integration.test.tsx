import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import App from '../App';
import Timer from '../Timer/Timer';
import TodoTable from '../Table/TodoTable';
import RootStore from '../../RootStore';
import TodoTaskAdd from '../Table/TodoTaskAdd';
import { MTableBodyRow, MTableCell } from 'material-table';

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

  it('Should create row on click on TodoTaskAdd', () => {
    wrapped
      .find(TodoTaskAdd)
      .find('input')
      .simulate('change', {
        target: { value: 'new Todo Task' },
      });
    wrapped.update();

    wrapped.find(TodoTaskAdd).find('form').simulate('submit');
    wrapped.update();

    expect(wrapped.find(TodoTable).find(MTableBodyRow).length).toEqual(1);

    const row = wrapped.find(TodoTable).find(MTableBodyRow).find(MTableCell);

    expect(row.find('td').first().render().text()).toContain('new Todo Task');
  });
});
