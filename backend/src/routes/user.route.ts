import express from 'express';
import { getProfile, logout, signin, signup } from '../controllers/user.controller';
import { isAuth } from '../middlewares/isAuth';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/logout', isAuth, logout);
router.get('/profile', isAuth, getProfile);

export default router;