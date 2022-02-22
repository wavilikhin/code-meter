import test from 'ava';
import { countMedianValue } from './countMedianValue';

test('works as expected', (t) => {
  const zero: number[] = [];
  const one = [1];
  const two = [3, 6];
  const three = [1, 3, 6];
  const many = [1, 3, 4, 8, 3, 6];

  t.is(countMedianValue(zero), undefined);
  t.is(countMedianValue(one), 1);
  t.is(countMedianValue(two), 4.5);
  t.is(countMedianValue(three), 3);
  t.is(countMedianValue(many), 5);
});
