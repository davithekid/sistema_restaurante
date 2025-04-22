import { Response, Request } from "express";
import { ReadAllModel, ReadModel } from "../models/GenericModel";

export const mesaController = {

    async getMesa(req: Request, res: Response) {

        try {
            const mesa = await ReadAllModel.getAll('mesa')
            res.status(200).json(mesa);
        } catch (err) {
            console.error('Erro ao buscar mesa', err)
        }
    },

    async get1mesa (req: Request, res: Response){
        const { id } = req.params;
        try {
            const mesa = await ReadModel.read('mesa', `id_mesa = ${id}`)
            if (!mesa){
                return res.status(404).send('mesa não encontrada');
            } 

            return res.json(mesa)

        } catch (err){
            console.log('Erro ao buscar mesa: ', err)
        }
    }


}