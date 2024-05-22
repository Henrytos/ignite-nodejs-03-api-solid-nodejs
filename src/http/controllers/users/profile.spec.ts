import { app } from "@/app";
import { afterEach, beforeEach } from "node:test";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";


describe('test profile (E2E)', () => {

    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })

    it('should get profile information', async () => {
        const { token, user } = await createAndAuthenticateUser(app)
        const response = await request(app.server).get('/me').set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toEqual(200)

        expect(response.body.user).toEqual(expect.objectContaining({
            email: user.email,
        }))
    })
})