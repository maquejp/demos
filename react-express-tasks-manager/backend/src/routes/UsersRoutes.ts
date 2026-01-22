import { Router } from 'express';
import { UsersController } from '@/controllers/UsersController';

const router = Router();
const usersController = new UsersController();

router.get('/', usersController.getAll);
router.get('/:id', usersController.getOne);

export default router;
