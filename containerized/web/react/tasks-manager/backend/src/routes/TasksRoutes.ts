import { Router } from 'express';
import { TasksController } from '@/controllers/TasksController';

const router = Router();
const tasksController = new TasksController();

router.get('/', tasksController.getAll);
router.get('/:id', tasksController.getOne);
router.put('/:id', tasksController.update);

export default router;
