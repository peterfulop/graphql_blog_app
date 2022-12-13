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
  cookie: {
    sessiontokenKey: {
      doc: 'token key',
      format: String,
      default: '',
      env: 'TOKEN_KEY',
    },
    sessiontokenExp: {
      doc: 'token key',
      format: String,
      default: '1d',
      env: 'TOKEN_EXP',
    },
  },
});

export const config = configObject.getProperties();
export type Config = typeof config;
