import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { authenticate } from './controllers/autheticate'
import { profile } from './controllers/profile'


export async function appRoutes(app: FastifyInstance) {
    app.post('/users', register)
    app.post('/session', authenticate)

    // auth 
    app.get('/me', profile)
}
