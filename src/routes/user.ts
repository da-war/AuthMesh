import { Router } from 'express';
import { createUser, getUsers, loginUser } from '../../src/controllers/user';

const router = Router();

router.post('/sign-up', createUser);
router.get('/', getUsers);
router.get('/:id', getUsers);
router.post('/login', loginUser); // Add login route

// Other CRUD routes can be added here

export default router;
