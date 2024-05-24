import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Refresh (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to Refresh token', async () => {

        await request(app.server).post('/users').send({
            name: 'henry',
            email: 'test@example.com',
            password: '123465'
        })
        const auth = await request(app.server).post('/session').send({
            email: 'test@example.com',
            password: '123465'
        })
        const cookies = auth.get('Set-Cookie') as string[]
        const response = await request(app.server)
            .patch('/token/refresh')
            .set('Cookie', cookies)
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({
            token: expect.any(String)
        })
        expect(response.get('Set-Cookie')).toEqual([
            expect.stringContaining('refreshToken=')
        ])
    })

})