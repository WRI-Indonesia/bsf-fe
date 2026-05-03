import * as migration_20260503_160453 from './20260503_160453';
import * as migration_20260503_174413 from './20260503_174413';
import * as migration_20260503_185443 from './20260503_185443';

export const migrations = [
  {
    up: migration_20260503_160453.up,
    down: migration_20260503_160453.down,
    name: '20260503_160453',
  },
  {
    up: migration_20260503_174413.up,
    down: migration_20260503_174413.down,
    name: '20260503_174413',
  },
  {
    up: migration_20260503_185443.up,
    down: migration_20260503_185443.down,
    name: '20260503_185443'
  },
];
