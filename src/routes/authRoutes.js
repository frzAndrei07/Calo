import { Router } from "express";
import * as c from '../controllers/authController.js';
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

router.get('/login', verifyToken, c.loginGet);

export default router;