import { Router } from 'express';
import { z } from 'zod';
import { EventDraftSchema } from 'jj-events-shared';

import { prisma } from '../../services/prisma';

const CreateEventPayload = EventDraftSchema.extend({
  id: z.string().uuid().optional()
});

export const eventRouter = Router();

eventRouter.post('/', async (req, res, next) => {
  try {
    const payload = CreateEventPayload.parse(req.body);
    const event = await prisma.event.create({
      data: {
        title: payload.title,
        data: payload
      }
    });
    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
});

eventRouter.put('/:id', async (req, res, next) => {
  try {
    const payload = CreateEventPayload.parse({ ...req.body, id: req.params.id });
    const event = await prisma.event.update({
      where: { id: payload.id! },
      data: { title: payload.title, data: payload }
    });
    res.json(event);
  } catch (error) {
    next(error);
  }
});

eventRouter.get('/:id', async (req, res, next) => {
  try {
    const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
    const event = await prisma.event.findUnique({ where: { id } });
    if (!event) {
      return res.status(404).json({ message: 'Événement introuvable' });
    }
    res.json(event);
  } catch (error) {
    next(error);
  }
});
