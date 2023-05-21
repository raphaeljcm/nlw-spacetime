import { FastifyInstance } from 'fastify';
import { z } from 'zod';

import { prisma } from '../lib/prisma';

export async function usersRoutes(app: FastifyInstance) {
  app.get('/users', async () => {
    const users = await prisma.user.findMany();
    return users;
  });

  app.delete('/users/:id', async request => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    await prisma.user.delete({
      where: {
        id,
      },
    });
  });
}
