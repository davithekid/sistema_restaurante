import express from "express";
import { clienteController } from "../controllers/clienteController";

const router = express();

router.get('/', clienteController.getClientes)

export default router;