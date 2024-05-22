import { FastifyInstance } from 'fastify'
import request from 'supertest'

const user = {
    name: 'henry',
    email: 'henry@example.com',
    password: '123456'
}

export async function createAndAuthenticateUser(app: FastifyInstance) {
    await request(app.server).post('/users').send({
        name: user.name,
        email: user.email,
        password: user.password
    })

    const response = await request(app.server).post('/session').send({
        email: user.email,
        password: user.password
    })

    const token = response.body.token

    return {
        token,
        user
    }
}