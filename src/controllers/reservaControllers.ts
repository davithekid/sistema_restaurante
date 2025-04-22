import { Request, Response } from 'express';
import { ReadAllModel, ReadModel } from '../models/GenericModel';

export const reservaController = {


    async getReseva(req: Request, res: Response) {
        try {
            const reserva = await ReadAllModel.getAll('reserva')
            res.status(200).json(reserva);
        } catch (err) {
            console.error('Reserva não encontrada. ', err)
        }
    },

    async get1Reserva(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const reserva = await ReadModel.read('reserva', `id_reserva = ${Number(id)}`)

            if (!reserva){
                 return res.status(401).send('reserva não encontrada');
            }

            return res.json(reserva)

        } catch(err) {
            console.error('Erro ao procurar reserva', err)
        }
    }

}