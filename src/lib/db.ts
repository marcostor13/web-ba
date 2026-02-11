import { createPool } from 'mysql2/promise';

const getEnv = (key: string, defaultValue: string = ''): string => {
    return (import.meta as any).env?.[key] || (process.env as any)[key] || defaultValue;
};

const pool = createPool({
    host: getEnv('DATABASE_HOST', 'localhost'),
    user: getEnv('DATABASE_USER', 'root'),
    password: getEnv('DATABASE_PASSWORD', ''),
    database: getEnv('DATABASE_NAME', 'ba_remodeling'),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;
