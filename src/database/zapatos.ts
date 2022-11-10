import * as zapatosGen from 'zapatos/generate';
import { config } from '../config/config';

const zapatosConfig: zapatosGen.Config = {
  db: {
    connectionString: config.databaseUrl,
  },
  outDir: './src/types',
  schemas: {
    public: {
      include: '*',
      exclude: ['knex_migrations', 'knex_migrations_lock'],
    },
  },
};

module.exports = zapatosGen.generate(zapatosConfig);
