export type Nullable<T> = T | null;

export type Direction = 'left' | 'right' | 'up' | 'down';

export type Cell = { position: number; value: Nullable<number> };
