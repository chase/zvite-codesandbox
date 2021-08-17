import express from 'express';
import { createServer } from 'vite';
import { join } from 'path';
import { ApolloServer } from 'apollo-server-express';
import { resolvers, context } from './src/resolvers.js';
import { typeDefs } from './src/schema.js';

const { HOSTNAME } = process.env;
function getHostFromCodesandboxHostname(host, port = null) {
  const parts = host.split('sse-sandbox-');
  if (parts.length === 1) {
    console.log(`We're not hosted on Codesandbox it seems`);
    process.exit(1);
  }
  const prefix = parts[1];
  return `${prefix}${port ? `-${port}` : ''}.sse.codesandbox.io`;
}
console.log('Vite HMR server:', getHostFromCodesandboxHostname(HOSTNAME, 9000));

async function createViteServer() {
  const server = new ApolloServer({ typeDefs, resolvers, context });
  await server.start();

  const vite = await createServer({
    server: {
      middlewareMode: 'html',
      hmr: {
        protocol: 'wss',
        host: getHostFromCodesandboxHostname(HOSTNAME, 9000),
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
