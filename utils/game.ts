import { Cell, Direction, Grid } from '../types/game';

export const isHorizontal = (direction: Direction): boolean =>
  direction === 'left' || direction === 'right' ? true : false;

export const isLeftOrUp = (direction: Direction): boolean =>
  direction === 'left' || direction === 'up';

const transponseGrid = (array: Grid): Grid =>
  array[0].map((_, colIndex) => array.map((row) => row[colIndex]));

const reverseRow = (row: Cell[]): Cell[] => [...row].reverse();

const mergeTwoCells = (first: Cell, second: Cell): Cell[] => {
  if (
    (first.value === null && second.value === null) ||
    (first.value !== null && second.value === null)
  ) {
    return [first, second];
  }

  if (first.value === null && second.value !== null) {
    return [
      {
        ...first,
        value: second.value,
        moved: true,
      },
      {
        ...second,
        value: null,
      },
    ];
  }

  if (
    first.value !== null &&
    second.value !== null &&
    first.value === second.value
  ) {
    return [
      {
        ...first,
        value: (first.value || 0) + (second.value || 0),
        moved: true,
        merged: true,
      },
      {
        ...second,
        value: null,
      },
    ];
  }

  return [first, second];
};

// IMPORTANT: for right or down direction, the array must be reversed when calling the function
const moveAndMergeCells = (
  row: Cell[],
  length: number,
  direction: Direction = 'left',
  initialX: number,
  initialY: number,
  newArr: Cell[] = []
): Cell[] => {
  const cellsWithValue = row.filter(({ value }) => value !== null);

  if (row.length === 0) {
    const horizontal = isHorizontal(direction);

    const nullArray: Cell[] = Array.from({
      length: length - newArr.filter(Boolean).length,
    }).map((_, index) => ({
      value: null,
      positionX: horizontal
        ? isLeftOrUp(direction)
          ? newArr.filter(Boolean).length + index + 1
          : initialX - newArr.filter(Boolean).length - index
        : initialX,
      positionY: horizontal
        ? initialY
        : isLeftOrUp(direction)
        ? newArr.filter(Boolean).length + index + 1
        : initialY - newArr.filter(Boolean).length - index,
    }));

    const numbersAndNulls = (
      isLeftOrUp(direction)
        ? [...newArr.filter(Boolean), ...nullArray]
        : reverseRow([
            ...reverseRow(nullArray),
            ...reverseRow(newArr.filter(Boolean)),
          ])
    ).map((cell, index) => {
      const positionX = horizontal
        ? isLeftOrUp(direction)
          ? initialX + index
          : initialX - index
        : initialX;
      const positionY = horizontal
        ? initialY
        : isLeftOrUp(direction)
        ? initialY + index
        : initialY - index;

      return {
        ...cell,
        positionX,
        positionY,
        moved:
          cell.moved ||
          (nullArray.length === 4
            ? false
            : horizontal
            ? positionX !== cell.positionX
            : positionY !== cell.positionY),
      };
    });

    return numbersAndNulls;
  }

  const [first, second, ...rest] = cellsWithValue;
  let arrToSend: Cell[] = [];

  if (!second) {
    newArr.push(first);
    return moveAndMergeCells(
      arrToSend,
      length,
      direction,
      initialX,
      initialY,
      newArr
    );
  }

  if (
    first.value === second.value &&
    first.value !== null &&
    second.value !== null
  ) {
    const newCells = mergeTwoCells(first, second);
    newArr.push({ ...newCells[0], merged: true });
    arrToSend = [newCells[1], ...rest];
  } else {
    newArr.push(first);
    arrToSend = [second, ...rest];
  }

  return moveAndMergeCells(
    arrToSend,
    length,
    direction,
    initialX,
    initialY,
    newArr
  );
};

export const calculateNewGrid = (
  grid: Grid,
  moveDirection: Direction
): Grid => {
  const canGridMove = gridHasPossibleMove(grid, moveDirection);
  if (!canGridMove) return grid;

  const transponsedGrid = isHorizontal(moveDirection)
    ? grid
    : transponseGrid(grid);

  const newGrid: Grid = transponsedGrid.map((row) => {
    const resetRow = row.map((cell) => ({
      ...cell,
      merged: false,
      newTile: false,
      moved: false,
    }));
    return moveAndMergeCells(
      isLeftOrUp(moveDirection) ? resetRow : reverseRow(resetRow),
      resetRow.length,
      moveDirection,
      isLeftOrUp(moveDirection)
        ? resetRow[0].positionX
        : resetRow[resetRow.length - 1].positionX,
      isLeftOrUp(moveDirection)
        ? resetRow[0].positionY
        : resetRow[resetRow.length - 1].positionY
    );
  });

  const transponsedBackGrid = isHorizontal(moveDirection)
    ? newGrid
    : transponseGrid(newGrid);
  const transponsedBackGridHasEmptyCell = transponsedBackGrid
    .flat()
    .some(({ value }) => value === null);

  return transponsedBackGridHasEmptyCell ? fillRandomCell(newGrid) : newGrid;
};

export const chunkArray = (myArray: Cell[], chunk_size: number): Grid => {
  var index = 0;
  var arrayLength = myArray.length;
  var tempArray: Grid = [];

  for (index = 0; index < arrayLength; index += chunk_size) {
    const myChunk = myArray.slice(index, index + chunk_size);
    tempArray.push(myChunk);
  }

  return tempArray;
};

export const fillRandomCell = (grid: Grid, cellsToFill: number = 1): Grid => {
  const length = grid.length;
  const flattenedGrid = grid.flat().map((cell) => ({
    ...cell,
    merged: false,
    newTile: false,
    moved: false,
  }));
  const cellsWithValue = flattenedGrid.filter((cell) => cell.value !== null);
  const cellsWithNullValue = flattenedGrid.filter(
    (cell) => cell.value === null
  );

  if (flattenedGrid.length === 0) {
    return grid;
  }

  for (let index = 0; index < cellsToFill; index++) {
    const randomCell =
      cellsWithNullValue[Math.floor(Math.random() * cellsWithNullValue.length)];
    const randomValue = Math.random() < 0.9 ? 2 : 4;

    randomCell.value = randomValue;
    randomCell.newTile = true;

    cellsWithValue.push(randomCell);
    cellsWithNullValue.splice(cellsWithNullValue.indexOf(randomCell), 1);
  }

  const newCellsArray = [...cellsWithValue, ...cellsWithNullValue].sort(
    (a, b) => {
      if (a.positionY === b.positionY) {
        return a.positionX - b.positionX;
      }

      return a.positionY - b.positionY;
    }
  );

  return chunkArray(newCellsArray, length);
};

export const generateNewGrid = (length: number = 4): Grid => {
  const arr: Grid = [];

  for (let i = 0; i < length; i++) {
    arr[i] = [];
    for (let j = 0; j < length; j++) {
      arr[i][j] = {
        positionX: j + 1,
        positionY: i + 1,
        value: null,
      };
    }
  }

  return arr;
};

export const gridHasPossibleMove = (
  grid: Grid,
  direction: Direction
): boolean => {
  const cellsWithNullValue = grid.flat().every((cell) => cell.value === null);
  if (cellsWithNullValue) return true;

  const horizontal = isHorizontal(direction);

  const gridToCheck = horizontal ? grid : transponseGrid(grid);

  const rowCanMove = gridToCheck.map((row) => {
    const moved = moveAndMergeCells(
      isLeftOrUp(direction) ? row : reverseRow(row),
      row.length,
      direction,
      isLeftOrUp(direction) ? row[0].positionX : row[row.length - 1].positionX,
      isLeftOrUp(direction) ? row[0].positionY : row[row.length - 1].positionY
    );

    return moved.filter(({ moved }) => moved).length > 0;
  });

  return rowCanMove.some((row) => row);
};

export const checkIfGameIsOver = (grid: Grid) => {
  const leftMove = gridHasPossibleMove(grid, 'left');
  const rightMove = gridHasPossibleMove(grid, 'right');
  const upMove = gridHasPossibleMove(grid, 'up');
  const downMove = gridHasPossibleMove(grid, 'down');

  if (!leftMove && !rightMove && !upMove && !downMove) {
    return true;
  }

  return false;
};
