//Dependencies 
import { Router } from "express";

//Controller
import * as c from '../../controllers/api/rootApiController.js';

//Middleware
import { verifyToken } from "../../middleware/verifyToken.js";

const router = Router();

router.get('/ingredients', verifyToken, c.getIngredients);
router.post('/ingredients', verifyToken, c.postIngredients);

export default router;