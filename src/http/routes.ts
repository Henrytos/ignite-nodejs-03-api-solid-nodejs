import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'

export async function RoutesApp(app: FastifyInstance) {
    app.post('/user', register)
}
