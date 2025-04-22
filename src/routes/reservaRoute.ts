import { Router } from "express";
import { reservaController } from "../controllers/reservaControllers";

const router = Router();

router.get('/', reservaController.getReseva);
router.get('/:id', reservaController.get1Reserva);

export default router;