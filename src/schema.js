import { gql } from 'apollo-server-express';
import { readFileSync } from 'fs';
import { join } from 'path';

export const typeDefs = gql(
  readFileSync(join(process.cwd(), 'graphql', 'schema.graphql')).toString()
);
