import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import 'dotenv/config';
import fastify from 'fastify';

import { authRoutes } from './routes/auth';
import { memoriesRoutes } from './routes/memories';
import { usersRoutes } from './routes/users';

const app = fastify();

app.register(cors, {
  origin: true,
});

app.register(jwt, {
  secret: 'spacetime',
});

app.register(authRoutes);
app.register(memoriesRoutes);
app.register(usersRoutes);

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => console.log('Server is running on port 3333'));
