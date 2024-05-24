import { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/middlewares/verify-jwt'
import { register } from './register'
import { authenticate } from './autheticate'
import { profile } from './profile'
import { refresh } from './refresh'


export async function usersRoutes(app: FastifyInstance) {
    app.post('/users', register)
    app.post('/session', authenticate)
    app.patch('/token/refresh', refresh)
    // auth 
    app.get('/me', { onRequest: [verifyJwt] }, profile)
}
