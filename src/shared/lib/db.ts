import { Pool } from "pg";

declare global {
  var __pgPool: Pool | undefined;
}

/**
 * Pool único reaproveitado entre requisições (e entre hot-reloads em dev) para
 * evitar esgotar conexões do Postgres. Não abre conexão até a primeira query.
 */
export function getPool(): Pool {
  if (!global.__pgPool) {
    global.__pgPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 5,
    });
  }

  return global.__pgPool;
}
