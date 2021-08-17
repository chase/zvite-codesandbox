import express from 'express';
import { createServer } from 'vite';
import { join } from 'path';
import { ApolloServer } from 'apollo-server-express';
import { resolvers, context } from './src/resolvers.js';
import { typeDefs } from './src/schema.js';

async function createViteServer() {
  const server = new ApolloServer({ typeDefs, resolvers, context });
  await server.start();

  const vite = await createServer({
    server: {
      middlewareMode: 'html',
      hmr: {
        protocol: 'wss',
        host: 'itp53-9000.sse.codesandbox.io',
        port: 9000,
        clientPort: 443
      }
    },
    root: join(process.cwd(), 'frontend'),
    clearScreen: false
  });

  const app = express();
  server.applyMiddleware({ app });

  app.use(vite.middlewares);

  app.listen(3000);
}

createViteServer();
