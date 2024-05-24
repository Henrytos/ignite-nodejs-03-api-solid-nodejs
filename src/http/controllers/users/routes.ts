import { FastifyInstance } from 'fastify'
import { register } from './register'
import { profile } from './profile'
import { refresh } from './refresh'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { authenticate } from './authenticate'


export async function usersRoutes(app: FastifyInstance) {
    app.post('/users', register)
    app.post('/session', authenticate)
    app.patch('/token/refresh', refresh)
    // auth 
    app.get('/me', { onRequest: [verifyJwt] }, profile)
}
