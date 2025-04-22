// clientesRoutes.ts
import { Router } from "express";
import { clienteController} from "../controllers/clienteController";

const router = Router();

router.get('/', clienteController.getClientes);
router.get('/:id', clienteController.get1Cliente);
router.post('/', clienteController.CriarCliente);
router.put('/:id', clienteController.atualizarCliente);
router.delete('/:id', clienteController.deletarCliente);

export default router;
