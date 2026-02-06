import { createPool } from 'mysql2/promise';

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "@Libido2010",
  database: "ba_remodeling",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export { pool as p };
