import React from 'react';
import MaterialTable from 'material-table';
import { connect, ConnectedProps } from 'react-redux';
import { Grid } from '@material-ui/core';
import { TableState, TodoTask } from '../../actions/table/TableActionTypes';
import { AppState } from '../../actions/CombineType';

const TodoTable = (props: TodoTableProps) => {
  return (
    <Grid container direction="row" alignItems="center" justify="center">
      <Grid item xs={10}>
        <MaterialTable
          columns={[
            { title: 'Todo Task', field: 'todoTask' },
            {
              title: 'Creation Time',
              field: 'creationTime',
              type: 'datetime',
              customSort: (a, b) =>
                a.creationTime.getTime() - b.creationTime.getTime(),
            },
            { title: 'Schedule Time', field: 'scheduleTime', type: 'numeric' },
            { title: 'Status', field: 'status' },
          ]}
          data={props.tableContent}
          title="Todo Task List"
          options={{
            sorting: true,
          }}
        />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state: AppState): TableState => {
  return {
    tableContent: state.todoList.tableContent,
  };
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type TodoTableProps = PropsFromRedux & {
  tableContent: TodoTask[];
};

export default connector(TodoTable);
