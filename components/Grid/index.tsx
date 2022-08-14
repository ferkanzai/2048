import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGame } from '../../hooks/useGame';
import { calculateNewGrid } from '../../utils/game';

type Cell = { position: number; value: number | null };

const Grid = ({ cells }: Props) => {
  const grid = cells * cells;
  const { cellsArray } = useGame(grid);

  // move right
  // 0 -> 1 -> 2 -> 3
  // 4 -> 5 -> 6 -> 7
  // 8 -> 9 -> 10 -> 11
  // 12 -> 13 -> 14 -> 15

  return (
    <GridWrapper cells={cells}>
      {cellsArray.map(({ position, value }) => (
        <Cell key={position}>{value}</Cell>
      ))}
    </GridWrapper>
  );
};

const GridWrapper = styled.div<{ cells: number }>`
  background-color: #949494;
  border-radius: 4px;
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(${({ cells }) => cells}, 1fr);
  grid-template-rows: repeat(${({ cells }) => cells}, 1fr);
  padding: 10px;
`;

const Cell = styled.div`
  align-items: center;
  background-color: #eee4da;
  border-radius: 4px;
  border: 1px solid #f9f6f2;
  box-sizing: border-box;
  color: #776e65;
  display: flex;
  font-size: 1.5rem;
  font-weight: bold;
  height: 60px;
  justify-content: center;
  line-height: 1;
  max-height: 100px;
  max-width: 100px;
  padding: 5px;
  width: 60px;
`;

type Props = {
  cells: number;
};

export default Grid;
