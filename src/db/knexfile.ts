import { config } from '../config/config';

export default {
  client: 'pg',
  connection: config.databaseUrl,
  migrations: {
    extension: 'ts',
    directory: '../migrations',
  },
};
