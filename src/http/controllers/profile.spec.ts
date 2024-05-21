import { app } from "@/app";
import { afterEach, beforeEach } from "node:test";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'


describe('test profile (E2E)', () => {

    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })

    it('should get profile information', async () => {
        await request(app.server).post('/users').send({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        })
        const auth = await request(app.server).post('/session').send({
            email: 'johndoe@example.com',
            password: '123456',
        })
        const token = auth.body.token
        const response = await request(app.server).get('/me').set('Authorization', `Bearer ${token}`)
        expect(response.statusCode).toEqual(200)
        expect(response.body.user).toEqual(expect.objectContaining({
            email: 'johndoe@example.com',
        }))
    })
})