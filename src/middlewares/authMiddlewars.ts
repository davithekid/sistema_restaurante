import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authorize = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', ' ');

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    try {
        const decoded: any = await jwt.verify(token, process.env.JWT_SECRET || 'segredo');

        // Atribuindo o usuário ao request
        req.user = decoded;

        // Passando para a próxima função no middleware
        next();

    }


}