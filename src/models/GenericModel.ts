import { getConnection } from "../database/connection";
import { ResultSetHeader } from 'mysql2/promise';

export interface Cliente {
    id_cliente?: string;
    nome_cliente: string;
}

// criando um "padrão" de CRUD 
export class ReadAllModel {
    static async getAll(table: string, where?: string) {
        const connection = await getConnection();
        try {
            let sql = `SELECT * FROM ${table}`;
            if (where) {
                sql += ` WHERE ${where}`;
            }

            const [rows] = await connection.execute(sql);
            return rows;
        } catch (err) {
            console.error(`Erro ao buscar registros em ${table}: `, err);
            throw err;
        } finally {
            connection.release();
        }
    }
}
// função para ler um registro específico
export class ReadModel {
    static async read(table: string, where?: string) {
        const connection = await getConnection();
        try {
            let sql = `SELECT * FROM ${table}`;
            if (where) {
                sql += ` WHERE ${where}`;
            }

            const [rows] = await connection.execute(sql);
            if (Array.isArray(rows)) {
                return rows[0] || null;
            }

            return null;

        } catch (err) {
            console.error('Erro ao ler clientes: ', err)
            throw err;
        } finally {
            connection.release();
        }
    }
}

// função para inserir dados
export class CreateModel {

   static async create(table: string, data: Record<string, any>) {
        const connection = await getConnection();
        try {
            const columns = Object.keys(data).join(', ');
            const placeholders = Array(Object.keys(data).length).fill('?').join(', ');
            const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;

            const values = Object.values(data);

            const [result] = await connection.execute<ResultSetHeader>(sql, values);

            return result.insertId;
        } catch (err) {
            console.error('Erro ao inserir registros: ', err);
            throw err;
        } finally {
            connection.release();
        }
    }
}

export class UpdateModel {
    static async update(table: string, data: Record<string, any>, where?: string) {
        const connection = await getConnection();
        try {
            const set = Object.keys(data).map(column => `${column} = ?`).join(', ');

            const sql = `UPDATE ${table} SET ${set} WHERE ${where}`;
            const values = Object.values(data);

            const [result] = await connection.execute<ResultSetHeader>(sql, [...values]);
            return result.affectedRows

        } catch (err) {
            console.error('Erro ao atualizar registros: ', err)
            throw err;
        } finally {
            connection.release();
        }
    }
}

// função para deletar um registro
export class DeleteModel {
   static  async deleteRecord(table:string, where?:string) {
        const connection = await getConnection();
        try {
            const sql = `DELETE FROM ${table} WHERE ${where}`;
            const [result] = await connection.execute<ResultSetHeader>(sql);
            return result.affectedRows;
        } catch (err) {
            console.error('Erro ao deletar registros: ', err)
            throw err;
        } finally {
            connection.release();
        }
    }
}






