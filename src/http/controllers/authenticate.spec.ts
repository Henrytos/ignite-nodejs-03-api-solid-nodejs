import { app } from '@/app';
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe('authenticate (E2E)', () => {

    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })

    it('should be able to register', async () => {
        await request(app.server).post('/users').send({
            name: 'henry',
            email: 'henry@example.com',
            password: '123456'
        })
        const response = await request(app.server).post('/session').send({
            email: 'henry@example.com',
            password: '123456'
        })

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({
            token: expect.any(String)
        })
    })
})