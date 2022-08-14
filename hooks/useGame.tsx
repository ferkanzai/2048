import { RefCallback, useEffect, useRef, useState } from 'react';
import { SwipeEventData, useSwipeable } from 'react-swipeable';
import { Cell } from '../types/game';
import { calculateNewGrid } from '../utils/game';

export const useGame = (grid: number) => {
  const [cellsArray, setCellsArray] = useState<Cell[]>(() => {
    return Array.from({ length: grid }).map((_, index) => ({
      position: index,
      value: null,
    }));
  });

  useEffect(() => {
    document.body.addEventListener('keydown', (e: KeyboardEvent) =>
      handleKeyDown(e)
    );

    return () => {
      document.body.removeEventListener('keydown', (e: KeyboardEvent) =>
        handleKeyDown(e)
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'ArrowRight') {
      setCellsArray((prevCellsArray) => {
        return calculateNewGrid(prevCellsArray, 'right');
      });
    }

    if (e.code === 'ArrowLeft') {
      setCellsArray((prevCellsArray) => {
        return calculateNewGrid(prevCellsArray, 'left');
      });
    }

    if (e.code === 'ArrowUp') {
      setCellsArray((prevCellsArray) => {
        return calculateNewGrid(prevCellsArray, 'up');
      });
    }

    if (e.code === 'ArrowDown') {
      setCellsArray((prevCellsArray) => {
        return calculateNewGrid(prevCellsArray, 'down');
      });
    }

    e.stopImmediatePropagation();
    e.stopPropagation();

    setCellsArray((prevCellsArray) => {
      return fillRandomCell(prevCellsArray);
    });
  };

  const handleSwipe = (eventData: SwipeEventData) => {
    if (eventData.dir === 'Right') {
      console.log('right');
      setCellsArray((prevCellsArray) => {
        return calculateNewGrid(prevCellsArray, 'right');
      });
    }

    if (eventData.dir === 'Left') {
      console.log('left');
      setCellsArray((prevCellsArray) => {
        return calculateNewGrid(prevCellsArray, 'left');
      });
    }

    if (eventData.dir === 'Up') {
      setCellsArray((prevCellsArray) => {
        return calculateNewGrid(prevCellsArray, 'up');
      });
    }

    if (eventData.dir === 'Down') {
      setCellsArray((prevCellsArray) => {
        return calculateNewGrid(prevCellsArray, 'down');
      });
    }

    eventData.event.preventDefault();
    eventData.event.stopPropagation();

    setCellsArray((prevCellsArray) => {
      return fillRandomCell(prevCellsArray);
    });
  };

  const fillRandomCell = (arr: Cell[]): Cell[] => {
    const cellsWithNullValue = arr.filter((cell) => cell.value === null);

    if (cellsWithNullValue.length === 0) return [];

    const randomIndex =
      cellsWithNullValue[Math.floor(Math.random() * cellsWithNullValue.length)]
        .position;
    const randomValue = Math.random() < 0.9 ? 2 : 4;

    const newCellsArray = [...arr];
    newCellsArray[randomIndex].value = randomValue;
    return newCellsArray;
  };

  const config = {
    delta: 50, // min distance(px) before a swipe starts. *See Notes*
    preventScrollOnSwipe: true, // prevents scroll during swipe (*See Details*)
    trackTouch: true, // track touch input
    trackMouse: false, // track mouse input
    rotationAngle: 0, // set a rotation angle
    swipeDuration: Infinity, // allowable duration of a swipe (ms). *See Notes*
    touchEventOptions: { passive: true }, // options for touch listeners (*See Details*)
  };

  const { ref } = useSwipeable({
    onSwiped: (eventData) => handleSwipe(eventData),
    ...config,
  }) as { ref: RefCallback<Document> };

  useEffect(() => {
    ref(document);
    return () => ref(null);
  });

  return {
    cellsArray,
  };
};
