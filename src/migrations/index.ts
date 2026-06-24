import * as migration_20260503_160453 from './20260503_160453';
import * as migration_20260503_174413 from './20260503_174413';
import * as migration_20260503_185443 from './20260503_185443';
import * as migration_20260504_024628 from './20260504_024628';
import * as migration_20260507_050717 from './20260507_050717';
import * as migration_20260512_043607 from './20260512_043607';
import * as migration_20260622_235434_add_public_users_and_abstracts from './20260622_235434_add_public_users_and_abstracts';
import * as migration_20260624_011914_add_event_registrations from './20260624_011914_add_event_registrations';
import * as migration_20260624_013332_add_food_preference_other from './20260624_013332_add_food_preference_other';

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
    name: '20260503_185443',
  },
  {
    up: migration_20260504_024628.up,
    down: migration_20260504_024628.down,
    name: '20260504_024628',
  },
  {
    up: migration_20260507_050717.up,
    down: migration_20260507_050717.down,
    name: '20260507_050717',
  },
  {
    up: migration_20260512_043607.up,
    down: migration_20260512_043607.down,
    name: '20260512_043607',
  },
  {
    up: migration_20260622_235434_add_public_users_and_abstracts.up,
    down: migration_20260622_235434_add_public_users_and_abstracts.down,
    name: '20260622_235434_add_public_users_and_abstracts',
  },
  {
    up: migration_20260624_011914_add_event_registrations.up,
    down: migration_20260624_011914_add_event_registrations.down,
    name: '20260624_011914_add_event_registrations',
  },
  {
    up: migration_20260624_013332_add_food_preference_other.up,
    down: migration_20260624_013332_add_food_preference_other.down,
    name: '20260624_013332_add_food_preference_other'
  },
];
