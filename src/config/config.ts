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
});

export const config = configObject.getProperties();
export type Config = typeof config;
