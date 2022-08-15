export type Nullable<T> = T | null;

export type Direction = 'left' | 'right' | 'up' | 'down';

export type Cell = {
  merged?: boolean;
  newTile?: boolean;
  positionX: number;
  positionY: number;
  value: Nullable<number>;
};

export type Grid = Cell[][];
