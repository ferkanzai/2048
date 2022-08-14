import { Cell, Direction, Nullable } from '../types/game';

export const isLeftOrUp = (direction: Direction): boolean =>
  direction === 'left' || direction === 'up';

export const isHorizontal = (direction: Direction): 'vertical' | 'horizontal' =>
  direction === 'left' || direction === 'right' ? 'horizontal' : 'vertical';

// IMPORTANT: for right or down direction, the array must be reversed when calling the function
export const moveAndAddNumbers = (
  arr: Array<Nullable<number>>,
  length: number,
  direction: Direction = 'right',
  newArr: Array<Nullable<number>> = []
): Array<Nullable<number>> => {
  const arrToCheck = arr.filter((item) => item !== null);

  if (arrToCheck.length === 0) {
    const nullArray = Array.from(
      { length: length - newArr.length },
      () => null
    );
    return isLeftOrUp(direction)
      ? [...newArr, ...nullArray]
      : [...nullArray, ...newArr.reverse()];
  }

  const [first, second, ...rest] = arrToCheck;
  let arrToSend: Array<Nullable<number>> = [];

  if (!second) {
    newArr.push(first);
    return moveAndAddNumbers(arrToSend, length, direction, newArr);
  }

  if (first === second && first !== null && second !== null) {
    newArr.push(first + second);
    arrToSend = rest;
  } else {
    newArr.push(first);
    arrToSend = [second, ...rest];
  }

  return moveAndAddNumbers(arrToSend, length, direction, newArr);
};

export const divideCells = (
  inputArray: Cell[],
  direction: 'vertical' | 'horizontal',
  length = 4
): Cell[][] => {
  return inputArray.reduce((acc, item, index) => {
    const chunkIndex =
      direction === 'horizontal' ? Math.floor(index / length) : index % length;
    if (!acc[chunkIndex]) acc[chunkIndex] = [];
    acc[chunkIndex].push(item);
    return acc;
  }, [] as Cell[][]);
};

export const putNumbersInPosition = (
  arr: Cell[],
  direction: Direction
): Cell[] => {
  const valuesArr = arr.map((cell) => cell.value);
  const numArr = isLeftOrUp(direction) ? valuesArr : [...valuesArr].reverse();

  const arrToPut = moveAndAddNumbers(numArr, arr.length, direction);

  return arr.map((cell, index) => ({ ...cell, value: arrToPut[index] }));
};

export const calculateNewGrid = (
  arr: Cell[],
  moveDirection: Direction
): Cell[] => {
  return divideCells(arr, isHorizontal(moveDirection))
    .flatMap((item) => putNumbersInPosition(item, moveDirection))
    .sort((a, b) => a.position - b.position);
};
