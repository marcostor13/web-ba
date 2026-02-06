import { Lucia } from 'lucia';
import { Mysql2Adapter } from '@lucia-auth/adapter-mysql';
import { p as pool } from './db_DIG-MEGf.mjs';

const adapter = new Mysql2Adapter(pool, {
  user: "user",
  session: "session"
});
const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production"
    }
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username
    };
  }
});

export { lucia as l };
