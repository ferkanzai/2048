import { RefCallback, useCallback, useEffect, useState } from 'react';
import { SwipeEventData, useSwipeable } from 'react-swipeable';
import { Grid } from '../types/game';
import {
  calculateNewGrid,
  generateNewGrid,
  gridHasPossibleMove,
} from '../utils/game';

export const useGame = () => {
  const [grid, setGrid] = useState<Grid>(() => generateNewGrid(4));
  const [isGameOver, setIsGameOver] = useState(false);
  // const [isGameWon, setIsGameWon] = useState(false);
  // const [score, setScore] = useState(0);
  // const [isGameStarted, setIsGameStarted] = useState(false);

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

    e.stopImmediatePropagation();
    e.stopPropagation();
  };

  const handleSwipe = (eventData: SwipeEventData) => {
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

    eventData.event.preventDefault();
    eventData.event.stopPropagation();
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
    grid,
    isGameOver,
    setIsGameOver,
    handleKeyDown,
    setGrid,
    // isGameWon,
    // score,
    // isGameStarted,
  };
};
