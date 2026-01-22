import { Router } from 'express';
import { UsersController } from '@/controllers/UsersController';

const router = Router();
const usersController = new UsersController();

router.get('/', usersController.getAll);
router.get('/:id', usersController.getOne);
router.get('/email/:email', usersController.getOneByEmail);

export default router;
