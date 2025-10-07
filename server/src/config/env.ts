import 'dotenv/config';

const required = ['DATABASE_URL', 'JWT_SECRET'] as const;

type RequiredEnv = (typeof required)[number];

function getEnv(name: RequiredEnv) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`La variable d'environnement ${name} est obligatoire.`);
  }
  return value;
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 4000),
  databaseUrl: getEnv('DATABASE_URL'),
  jwtSecret: getEnv('JWT_SECRET')
};
