import React from 'react';
import Grid from '../Grid';

const Board = ({ cells = 4 }: Props) => {
  return (
    <>
      <Grid cells={cells} />
    </>
  );
};

type Props = {
  cells?: number;
};

export default Board;
