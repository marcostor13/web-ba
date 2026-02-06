import { createPool } from 'mysql2/promise';

const pool = createPool({
    host: import.meta.env.DATABASE_HOST || 'localhost',
    user: import.meta.env.DATABASE_USER || 'root',
    password: import.meta.env.DATABASE_PASSWORD || '',
    database: import.meta.env.DATABASE_NAME || 'ba_remodeling',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;
