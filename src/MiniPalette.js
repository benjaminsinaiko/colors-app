import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
  main: {
    backgroundColor: 'purple',
    border: '3 px solid teal',
  },
  secondary: {
    backgroundColor: 'pink',
    '& h1': {
      color: 'white',
      '& span': {
        backgroundColor: 'yellow',
      },
    },
  },
};

function MiniPalette(props) {
  const { classes } = props;
  console.log(classes);

  return (
    <div className={classes.main}>
      <h1>Mini Palette</h1>
      <section className={classes.secondary}>
        <h1>
          Mini Palette <span>inside seconday, h1, span</span>
        </h1>
        <span>Span inside seconday, outside h1</span>
      </section>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);
