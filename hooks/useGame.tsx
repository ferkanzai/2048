import { RefCallback, useCallback, useEffect, useState } from 'react';
import { SwipeEventData, useSwipeable } from 'react-swipeable';
import { Grid } from '../types/game';
import {
  calculateNewGrid,
  checkIfGameIsOver,
  fillRandomCell,
  generateNewGrid,
} from '../utils/game';

export const useGame = (length: number) => {
  const [grid, setGrid] = useState<Grid>(() => generateNewGrid(length));
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  // const [score, setScore] = useState(0);

  useEffect(() => {
    const gameOver = checkIfGameIsOver(grid);
    setIsGameOver(gameOver);
  }, [grid]);

  const startGame = () => {
    const newGrid = fillRandomCell(generateNewGrid(length), 2);
    setIsGameStarted(true);
    setGrid(newGrid);
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isGameStarted) {
        if (e.code === 'ArrowRight') {
          setGrid((prevGrid) => {
            return calculateNewGrid(prevGrid, 'right');
          });
        }

        if (e.code === 'ArrowLeft') {
          setGrid((prevGrid) => {
            return calculateNewGrid(prevGrid, 'left');
          });
        }

        if (e.code === 'ArrowUp') {
          setGrid((prevGrid) => {
            return calculateNewGrid(prevGrid, 'up');
          });
        }

        if (e.code === 'ArrowDown') {
          setGrid((prevGrid) => {
            return calculateNewGrid(prevGrid, 'down');
          });
        }
      }

      e.stopImmediatePropagation();
      e.stopPropagation();
    },
    [isGameStarted]
  );

  useEffect(() => {
    document.addEventListener('keydown', (e: KeyboardEvent) =>
      handleKeyDown(e)
    );

    return () => {
      document.removeEventListener('keydown', (e: KeyboardEvent) =>
        handleKeyDown(e)
      );
    };
  });

  const handleSwipe = (eventData: SwipeEventData) => {
    if (!isGameStarted) {
      if (eventData.dir === 'Right') {
        setGrid((prevGrid) => {
          return calculateNewGrid(prevGrid, 'right');
        });
      }

      if (eventData.dir === 'Left') {
        setGrid((prevGrid) => {
          return calculateNewGrid(prevGrid, 'left');
        });
      }

      if (eventData.dir === 'Up') {
        setGrid((prevGrid) => {
          return calculateNewGrid(prevGrid, 'up');
        });
      }

      if (eventData.dir === 'Down') {
        setGrid((prevGrid) => {
          return calculateNewGrid(prevGrid, 'down');
        });
      }
    }

    eventData.event.preventDefault();
    eventData.event.stopPropagation();
  };

  const config = {
    delta: 10, // min distance(px) before a swipe starts. *See Notes*
    preventScrollOnSwipe: false, // prevents scroll during swipe (*See Details*)
    trackTouch: true, // track touch input
    trackMouse: false, // track mouse input
    rotationAngle: 0, // set a rotation angle
    swipeDuration: Infinity, // allowable duration of a swipe (ms). *See Notes*
    touchEventOptions: { passive: false }, // options for touch listeners (*See Details*)
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
    grid,
    isGameOver,
    setGrid,
    startGame,
    isGameStarted,
    setIsGameStarted,
    // score,
  };
};
