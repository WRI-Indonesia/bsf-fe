import * as migration_20260430_062717_db_v1_0 from './20260430_062717_db_v1_0';
import * as migration_20260430_064348_db_v1_0 from './20260430_064348_db_v1_0';

export const migrations = [
  {
    up: migration_20260430_062717_db_v1_0.up,
    down: migration_20260430_062717_db_v1_0.down,
    name: '20260430_062717_db_v1_0',
  },
  {
    up: migration_20260430_064348_db_v1_0.up,
    down: migration_20260430_064348_db_v1_0.down,
    name: '20260430_064348_db_v1_0'
  },
];
