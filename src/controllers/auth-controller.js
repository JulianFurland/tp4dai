import {Router} from 'express';
import AuthMiddleware from '../middleware/auth-middleware.js';
const router = Router();



router.post('', AuthMiddleware.AuthMiddleware, async (req, res) => {

});

export default router;