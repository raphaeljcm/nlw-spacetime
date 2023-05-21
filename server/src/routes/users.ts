import { FastifyInstance } from 'fastify';
import { z } from 'zod';

import { prisma } from '../lib/prisma';

export async function usersRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async request => await request.jwtVerify());

  app.get('/users', async () => {
    const users = await prisma.user.findMany();
    return users;
  });

  app.delete('/users/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    });

    if (user.id !== request.user.sub) return reply.status(401).send();

    await prisma.user.delete({
      where: {
        id,
      },
    });
  });
}
