import cors from '@fastify/cors';
import 'dotenv/config';
import fastify from 'fastify';

import { authRoutes } from './routes/auth';
import { memoriesRoutes } from './routes/memories';
import { usersRoutes } from './routes/users';

const app = fastify();

app.register(cors, {
  origin: true,
});

app.register(authRoutes);
app.register(memoriesRoutes);
app.register(usersRoutes);

app
  .listen({
    port: 3333,
  })
  .then(() => console.log('Server is running on port 3333'));
