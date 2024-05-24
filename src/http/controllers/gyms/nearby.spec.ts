import { test } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to view gyms nearby', async () => {
        const { token } = await createAndAuthenticateUser(app, true)

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'TypeScript Gym',
                description: 'Some description.',
                phone: '1199999999',
                latitude: -27.0610928,
                longitude: -49.5229501,
            })

        await request(app.server).post('/gyms').send({
            title: 'javascript gym 1',
            description: 'javascript gyms 1',
            phone: '11 999999999',
            latitude: -27.2092052,
            longitude: -27.2092052,
        }).set('Authorization', `Bearer ${token}`)

        const response = await request(app.server).get('/gyms/nearby').query({
            latitude: -27.2092052,
            longitude: -27.2092052,
        }).set('Authorization', `Bearer ${token}`).send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: 'javascript gym 1',
            })
        ])
    })
})