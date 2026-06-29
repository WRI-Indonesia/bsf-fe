import * as migration_20260629_020241 from './20260629_020241';

export const migrations = [
  {
    up: migration_20260629_020241.up,
    down: migration_20260629_020241.down,
    name: '20260629_020241'
  },
];
