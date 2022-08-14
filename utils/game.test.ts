import { isHorizontal, isLeftOrUp, moveAndAddNumbers } from './game';

describe('isLeftOrUp', () => {
  it('should return true if direction is left or up', () => {
    expect(isLeftOrUp('left')).toBe(true);
    expect(isLeftOrUp('up')).toBe(true);
  });

  it('should return false if direction is right or down', () => {
    expect(isLeftOrUp('right')).toBe(false);
    expect(isLeftOrUp('down')).toBe(false);
  });
});

describe('isHorizontal', () => {
  it('should return horizonal for left and right', () => {
    expect(isHorizontal('left')).toBe('horizontal');
    expect(isHorizontal('right')).toBe('horizontal');
  });

  it('should return vertical for up and down', () => {
    expect(isHorizontal('up')).toBe('vertical');
    expect(isHorizontal('down')).toBe('vertical');
  });
});

describe('moveAndAddNumbers', () => {
  it('should return all null array for array with all nulls', () => {
    const arr = [null, null, null, null];
    const newArr = moveAndAddNumbers(arr.reverse(), arr.length, 'right');

    expect(newArr).toEqual(arr);
  });

  it('should return correct array', () => {
    const arr = [2, 2, 2, 2];
    const newArr = moveAndAddNumbers(arr.reverse(), arr.length, 'right');

    expect(newArr).toEqual([null, null, 4, 4]);
  });
});
