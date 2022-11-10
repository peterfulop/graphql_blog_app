import convict from 'convict';
import dotenv from 'dotenv';
dotenv.config();

const configObject = convict({
  backendPort: {
    doc: 'port of the server',
    format: Number,
    default: 5000,
    env: 'BACKEND_PORT',
  },
  databaseUrl: {
    doc: 'postgres database connection string',
    format: String,
    default: 'postgres://user:password@localhost:5444/blog_app',
    env: 'DATABASE_URL',
  },
});

export const config = configObject.getProperties();
export type Config = typeof config;
