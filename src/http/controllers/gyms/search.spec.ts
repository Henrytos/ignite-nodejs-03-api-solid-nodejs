import { test } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Search gym (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able search gyms', async () => {
        const { token } = await createAndAuthenticateUser(app)

        await request(app.server).post('/gyms').send({
            title: 'javascript gym 1',
            description: 'javascript gyms 1',
            phone: '11 999999999',
            latitude: -27.2092052,
            longitude: -27.2092052,
        }).set('Authorization', `Bearer ${token}`)

        await request(app.server).post('/gyms').send({
            title: 'javascript gym 2',
            description: 'javascript gyms 2',
            phone: '11 999999999',
            latitude: -27.2092052,
            longitude: -27.2092052,
        }).set('Authorization', `Bearer ${token}`)



        const response = await request(app.server).get('/gyms/search').query({
            query: 'javascript',
            page: 1
        }).set('Authorization', `Bearer ${token}`).send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(2)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: 'javascript gym 1'
            }),
            expect.objectContaining({
                title: 'javascript gym 2'
            })
        ])
    })
})