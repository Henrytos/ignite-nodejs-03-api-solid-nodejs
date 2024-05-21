import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  JWT_SECRET: z.string(),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  DATABASE_URL: z.string().default(''),
  PORT: z.coerce.number().default(3333)
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error("Invalid Enviorment Variables", _env.error.format())
  throw new Error("Invalid Enviorment Variables")
}

export const env = _env.data