//Dependencies
import { Router } from "express";

//Controller
import * as c from '../../controllers/api/authApiController.js';

const router = Router();

router.post('/su', c.suPost);
router.post('/si', c.siPost);

export default router;