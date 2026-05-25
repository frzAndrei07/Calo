//Dependencies
import { Router } from "express";

//Controller
import * as c from '../../controllers/api/authApiController.js';

const router = Router();

router.post('/su', c.suPost);

export default router;