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
  bcryptSalt: {
    doc: 'salt string to hash data',
    format: String,
    default: '',
    env: 'SALT',
  },
});

export const config = configObject.getProperties();
export type Config = typeof config;
