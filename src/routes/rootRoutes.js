//Dependencies
import { Router } from "express";

//Controller
import * as c from '../controllers/rootController.js';

//Middleware
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

router.get('/', verifyToken, c.rootGet)

export default router;