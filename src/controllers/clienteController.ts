import express from 'express';
import { Request, Response} from "express";
import { ReadAllModel, ReadModel, CreateModel, UpdateModel, DeleteModel } from "../models/genericModel";
const router = express.Router();

export const clienteController = {
    async getClientes(req: Request, res: Response) {
        try {
            const clientes = await ReadAllModel.getAll('cliente')
            res.status(200).json(clientes);
        } catch (err) {
            res.status(500).json({ error: "Erro ao buscar clientes" });
        }
    },
}

