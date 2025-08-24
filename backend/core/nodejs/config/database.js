import mysql from 'mysql2/promise';

class Database {
    constructor() {
        this.pool = null;
    }

    connect() {
        if(this.pool) return this.pool;

        try {
            this.pool = mysql.createPool({
               host: process.env.DB_HOST || 'localhost',
               user: process.env.DB_USER || 'root',
               password: process.env.DB_PASSWORD || '0000',
               database: process.env.DB_NAME || 'senasoft',
            });

            //console.log('✅ Conexión a la base de datos establecida');

            return this.pool;
        } catch (error) {
            //console.error('❌ Error al conectar a la base de datos:', error);
            throw error;
        }
    }

    async query(sql, params) {
        try {
            const pool = this.connect();
            const [rows] = await pool.query(sql, params);
            return rows;
        } catch (error) {
            //console.error('❌ Error al ejecutar la consulta:', error);
            throw error;
        }
    }

    async close() {
        if(this.pool) {
            await this.pool.end();
            this.pool = null;
            //console.log('✅ Conexión a la base de datos cerrada');
        }
    }
}

export default new Database();