import { Router } from 'express';
import { eventRouter } from './modules/events.routes';

export const router = Router();

router.use('/events', eventRouter);
