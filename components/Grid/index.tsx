import styled from 'styled-components';
import { useGame } from '../../hooks/useGame';

type Cell = { position: number; value: number | null };

const Grid = ({ cells }: Props) => {
  const { grid } = useGame(cells);

  return (
    <GridWrapper cells={cells}>
      {grid.map((row) =>
        row.map(({ positionX, positionY, value }) => (
          <Cell key={`${positionY}-${positionX}`} value={value}>
            {value}
          </Cell>
        ))
      )}
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

const Cell = styled.div<{ value: number | null }>`
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  align-items: center;
  background-color: ${({ value }) => {
    if (value === null) return '#cdc1b4';
    if (value === 2) return '#eee4da';
    if (value === 4) return '#ede0c8';
    if (value === 8) return '#f2b179';
    if (value === 16) return '#f59563';
    if (value === 32) return '#f67c5f';
    if (value === 64) return '#f65e3b';
    if (value === 128) return '#edcf72';
    if (value === 256) return '#edcc61';
    if (value === 512) return '#edc850';
    if (value === 1024) return '#edc53f';
    if (value >= 2048) return '#edc22e';
  }};
  border-radius: 4px;
  box-sizing: border-box;
  color: ${({ value }) => {
    if (value === null || value <= 4) return '#776e65';
    if (value > 4) return '#f9f6f2';
  }};
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
