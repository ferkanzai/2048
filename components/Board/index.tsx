import { useGame } from '../../hooks/useGame';
import Button from '../Button';
import Grid from '../Grid';

const Board = ({ cells = 4 }: Props) => {
  const { isGameOver, startGame, grid, isGameStarted } = useGame(cells);

  return (
    <>
      {isGameOver ? <h1>Game Over</h1> : null}
      <Button text={isGameStarted ? 'RESET' : 'START'} onClick={startGame} />
      <Grid grid={grid} />
    </>
  );
};

type Props = {
  cells?: number;
};

export default Board;
