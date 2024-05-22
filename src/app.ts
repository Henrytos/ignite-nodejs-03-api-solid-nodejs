import { fastify } from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import { usersRoutes } from './http/controllers/users/routes'
import { gymsRoutes } from './http/controllers/gyms/routes'
import { checkInsRoutes } from './http/controllers/check-ins/routes'
import fastifyCookie from '@fastify/cookie'

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false
    },
    sign: {
        expiresIn: '10m'
    }

})
app.register(fastifyCookie)

app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)



app.setErrorHandler(async (error, _, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({ message: error.format() })//syntaxe invalida 
    }
    if (env.NODE_ENV != 'production') {
        console.error(error)
    }

    return reply.status(500).send({ message: 'Internal server error' })
})
