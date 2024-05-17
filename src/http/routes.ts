import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { authenticate } from './controllers/autheticate'

export async function appRoutes(app: FastifyInstance) {
    app.get('/',()=>{
        return {hello:'hello'}
    })
    app.post('/users', register)
    app.post('/sessions',authenticate)
}
