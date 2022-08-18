import styled from 'styled-components';
import { Grid as GridType } from '../../types/game';

type Props = {
  grid: GridType;
};

const Grid = ({ grid }: Props) => {
  return (
    <GridWrapper cells={grid.length}>
      {grid.map((row) =>
        row.map(({ positionX, positionY, value, newTile, merged }) => (
          <Cell
            key={`${positionY}-${positionX}`}
            merged={merged}
            newTile={newTile}
            value={value}
          >
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

const Cell = styled.div<{
  merged?: boolean;
  newTile?: boolean;
  value: number | null;
}>`
  @-webkit-keyframes appear {
    0% {
      opacity: 0;
      -webkit-transform: scale(0);
      -moz-transform: scale(0);
    }

    100% {
      opacity: 1;
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
    }
  }
  @-moz-keyframes appear {
    0% {
      opacity: 0;
      -webkit-transform: scale(0);
      -moz-transform: scale(0);
    }

    100% {
      opacity: 1;
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
    }
  }
  @keyframes appear {
    0% {
      opacity: 0;
      -webkit-transform: scale(0);
      -moz-transform: scale(0);
    }

    100% {
      opacity: 1;
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
    }
  }

  @-webkit-keyframes pop {
    0% {
      -webkit-transform: scale(0);
      -moz-transform: scale(0);
    }

    50% {
      -webkit-transform: scale(1.2);
      -moz-transform: scale(1.2);
    }

    100% {
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
    }
  }
  @-moz-keyframes pop {
    0% {
      -webkit-transform: scale(0);
      -moz-transform: scale(0);
    }

    50% {
      -webkit-transform: scale(1.2);
      -moz-transform: scale(1.2);
    }

    100% {
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
    }
  }
  @keyframes pop {
    0% {
      -webkit-transform: scale(0);
      -moz-transform: scale(0);
    }

    50% {
      -webkit-transform: scale(1.2);
      -moz-transform: scale(1.2);
    }

    100% {
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
    }
  }

  ${({ newTile }) => {
    if (newTile)
      return `
        -webkit-animation: appear 200ms ease 100ms;
        -moz-animation: appear 200ms ease 100ms;
        -webkit-animation-fill-mode: both;
        -moz-animation-fill-mode: both;
    `;
  }}

  ${({ merged }) => {
    if (merged)
      return `
        z-index: 20;
        -webkit-animation: pop 200ms ease 100ms;
        -moz-animation: pop 200ms ease 100ms;
        -webkit-animation-fill-mode: both;
        -moz-animation-fill-mode: both;
    `;
  }}

  -webkit-transition: 100ms ease-in-out;
  -moz-transition: 100ms ease-in-out;
  -webkit-transition-property: top, left;
  -moz-transition-property: top, left;
  transition: 100ms ease-in-out;
  transition-property: top, left;
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
    if (value === 2048) return '#edc22e';
    if (value > 2048) return '#191919';
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

export default Grid;
