import React from 'react';
import Grid from '../Grid';

const Board = ({ cells = 4 }: Props) => {
  return (
    <>
      <Grid />
    </>
  );
};

type Props = {
  cells?: number;
};

export default Board;
