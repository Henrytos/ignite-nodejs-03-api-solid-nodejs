import { fastify } from 'fastify'
import { appRoutes } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET
})

app.register(appRoutes)



app.setErrorHandler(async (error, _, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({ message: error.format() })//syntaxe invalida 
    }
    if (env.NODE_ENV != 'production') {
        console.error(error)
    }

    return reply.status(500).send({ message: 'Internal server error' })
})
