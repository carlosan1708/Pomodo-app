import React from 'react';
import RootStore from '../../RootStore';
import { createMount } from '@material-ui/core/test-utils';
import TodoTaskAdd from '../Table/TodoTaskAdd';
import { Button, OutlinedInput } from '@material-ui/core';

describe('<TodoTaskAdd/>', () => {
  let wrapped: any;

  beforeAll(() => {
    const mount = createMount();
    wrapped = mount(
      <RootStore>
        <TodoTaskAdd />
      </RootStore>
    );
  });

  afterAll(() => {
    wrapped.cleanUp();
  });

  it('should mount a Basic Material UI elements', () => {
    expect(wrapped.find(OutlinedInput).length).toEqual(1);
    expect(wrapped.find(Button).length).toEqual(1);
  });

  describe('Test input element', () => {
    beforeEach(() => {
      wrapped.find('input').simulate('change', {
        target: { value: 'new Todo Task' },
      });
      wrapped.update();
    });

    it('Should change text area and persist on value', () => {
      expect(wrapped.find('input').prop('value')).toEqual('new Todo Task');
    });

    it('Clear input when add Todo Task Button is pressed', () => {
      wrapped.find('form').simulate('submit');
      wrapped.update();
      expect(wrapped.find('input').prop('value')).toEqual('');
    });
  });
});
