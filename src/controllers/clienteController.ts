// clienteController.ts
import { Request, Response } from "express";
import { CreateModel, DeleteModel, ReadAllModel, ReadModel, UpdateModel } from "../models/GenericModel";

export const clienteController = {
    async getClientes(req: Request, res: Response) {
        try {
            const clientes = await ReadAllModel.getAll('cliente');
            res.status(200).json(clientes);
        } catch (err) {
            res.status(500).json({ error: "Erro ao buscar clientes" });
        }
    },

    async get1Cliente(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const cliente = await ReadModel.read('cliente', `id_cliente = ${Number(id)}`);
            if (!cliente) {
                return res.status(404).send('Cliente não encontrado');
            }
            res.status(200).json(cliente);
        } catch (err) {
            res.status(500).json({ error: "Erro ao buscar cliente" });
        }
    },

    async CriarCliente(req: Request, res: Response) {
        const { nome } = req.body;
        try {
            const cliente = await CreateModel.create('cliente', {
                nome_cliente: nome,

            });

            res.status(201).send('Cliente criado com sucesso!!');
        } catch (err) {
            console.error(err);
            res.status(500).send('Erro ao inserir dados.');
        }
    },

    async atualizarCliente(req: Request, res: Response) {
        const { id } = req.params;
        const { nome } = req.body;

        try {
            const cliente = await UpdateModel.update('cliente',
                { nome_cliente: nome },
                `id_cliente = ${Number(id)}`
            );

            if (cliente) {
                res.json({ id, nome });
            } else {
                res.status(404).send('Cliente não encontrado para atualizar');
            }
        } catch (err) {
            console.error('Erro ao atualizar cliente:', err);
            res.status(500).send('Erro interno ao atualizar cliente.');
        }
    },

    async deletarCliente (req: Request, res: Response){
        const { id } = req.params;

        try {
            const cliente = await DeleteModel.deleteRecord('cliente', 
                `id_cliente = ${Number(id)}`
            );

            if (cliente) {
                res.json({ id });
            } else {
                res.status(404).send('Cliente não encontrado para atualizar');
            }
        } catch (err) {
            console.error('Erro ao atualizar cliente:', err);
            res.status(500).send('Erro interno ao atualizar cliente.');
        }
    }


};
