import { getConnection } from "../database/connection";

export async function readAll(table: string, where = null) {
    const connection = await getConnection();
    try {
        let sql = `SELECT *FROM ${table}`;
        if (where) {
            sql += ` WHERE ${where}`
        }
        const [rows] = await connection.execute(sql);
        return rows;
    } catch (err) {
        console.error('Erro ao ler registros: ', err);
        throw err;
    } finally {
        connection.release();
    }
}



