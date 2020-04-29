import React from 'react';
import { withStyles, WithStyles, Grid } from '@material-ui/core';

import Timer from './Timer/Timer';
import TodoTable from './Table/TodoTable';
import TodoTaskAdd from './Table/TodoTaskAdd';

const App = (props: WithStyles) => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={0}
        direction="row"
        alignItems="center"
        justify="center"
        style={{ height: '10vh', marginTop: '10vh' }}
      >
        <Grid item xs={10} md={8} lg={4} xl={4}>
          <TodoTaskAdd />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={0}
        direction="row"
        alignItems="center"
        justify="center"
        style={{ height: '30vh' }}
      >
        <Grid item xs={10} md={8} lg={8} xl={4}>
          <Timer />
        </Grid>
      </Grid>
      <TodoTable />
    </div>
  );
};

const styles = (theme: {
  breakpoints: { up: (arg0: string) => string | number | symbol };
}): any => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)',
  },
  '@global': {
    // MUI typography elements use REMs, so you can scale the global
    // font size by setting the font-size on the <html> element.
    html: {
      fontSize: 16,
      [theme.breakpoints.up('xs')]: {
        fontSize: 12,
      },
      [theme.breakpoints.up('md')]: {
        fontSize: 14,
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: 16,
      },
      [theme.breakpoints.up('xl')]: {
        fontSize: 20,
      },
    },
  },
});

export default withStyles(styles)(App);
