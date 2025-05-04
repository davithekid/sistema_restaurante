import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import pool from '../database/connection';

const JWT_SECRET = 'segredo';

export const login = async (req: Request, res: Response) => {
    const { user_admin, senha_admin } = req.body;


    // se for diferente 
    if (!user_admin || !senha_admin) {
        return res.status(400).json({ message: 'Usuário e senha são obrigatórios' })
    }

    try {

        // USUÁRIO
        const [rows]: any = await pool.query('SELECT * FROM admin WHERE user_admin = ?',
            [user_admin]
        );

        if (rows.length === 0) {
            return res.status(400).json({ message: 'Usuário não encontrado' });
        }

        // --------------------------------------------- //

        //SENHA
        const isPasswordValid = await bcrypt.compare(senha_admin, rows[0].senha_admin);

        if (!isPasswordValid) {
            res.status(400).send({ message: 'Senha Inválida' })
        }


        // token
        const token = jwt.sign(
            { user_admin: rows[0].user_admin },
            JWT_SECRET,
            { expiresIn: '1h' } // data de 'validade'
        )

        return res.json({ token })
    } catch (err) {
        console.error('Erro no login', err);
        return res.status(500).send({ message: 'Erro interno no servidor' })
    }


}