import { Router } from "express";
import { mesaController } from "../controllers/mesaController";
const router = Router();

router.get('/', mesaController.getMesa)
router.get('/:id', mesaController.get1mesa)

export default router;