import fastify from 'fastify';

import { memoriesRoutes } from './routes/memories';
import { usersRoutes } from './routes/users';

const app = fastify();

app.register(memoriesRoutes);
app.register(usersRoutes);

app
  .listen({
    port: 3333,
  })
  .then(() => console.log('Server is running on port 3333'));
