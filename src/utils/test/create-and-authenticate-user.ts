import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

const user = {
    name: 'henry',
    email: 'henry@example.com',
    password: '123456'
}

export async function createAndAuthenticateUser(app: FastifyInstance, isAdminRole = false) {
    await prisma.user.create({
        data: {
            name: user.name,
            email: user.email,
            password_hash: await hash(user.password, 6),
            role: isAdminRole ? 'ADMIN' : 'MEMBER',
        }
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