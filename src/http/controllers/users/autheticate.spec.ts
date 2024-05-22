import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
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
        const { token } = await createAndAuthenticateUser(app)

        expect(token).toEqual(expect.any(String))
    })
})