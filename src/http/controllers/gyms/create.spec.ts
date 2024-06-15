import { test } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Gym (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to register', async () => {
        const { token } = await createAndAuthenticateUser(app, true)
        const response = await request(app.server).post('/gyms').send({
            title: 'javascript gym 1',
            description: 'javascript gyms 1',
            phone: '11 999999999',
            latitude: -27.2092052,
            longitude: -27.2092052,
        }).set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toEqual(201)

    })
})