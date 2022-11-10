import express from 'express';
import http from 'http';
import morgan from 'morgan';
import { createApolloServer } from './apollo';
import { config } from './config/config';
const app = express();
app.use(morgan('dev'));

const startServer = async (): Promise<void> => {
  const httpServer = http.createServer(app);
  const apolloServer = createApolloServer();
  await apolloServer.server.start();
  apolloServer.server.applyMiddleware({ app });

  const port = Number(config.backendPort) || 8082;

  await new Promise<void>((resolve) =>
    httpServer.listen({ host: '0.0.0.0', port }, resolve)
  );

  console.log(
    `🚀 Server ready at http://localhost:${port}${apolloServer.server.graphqlPath}/`
  );
};

startServer();
