//Dependencies
import { Router } from "express";

//Controller
import * as c from '../controllers/authController.js';

//Middleware
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

router.get('/', c.authGet);

export default router;