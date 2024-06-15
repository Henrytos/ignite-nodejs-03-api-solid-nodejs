import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Create Check-in (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to create a check-in', async () => {
        const { token } = await createAndAuthenticateUser(app, true)
        const user = await prisma.user.findFirstOrThrow()
        const gym = await prisma.gym.create({
            data: {
                title: 'JavaScript Gym',
                latitude: -27.2092052,
                longitude: -49.6401091,
            }
        })

        await prisma.checkIn.createMany({
            data: [
                {
                    user_id: user.id,
                    gym_id: gym.id
                },
                {
                    user_id: user.id,
                    gym_id: gym.id
                }
            ]
        })

        const response = await request(app.server).get('/check-ins/history').query({
            query: 1
        }).set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toEqual(200)
        expect(response.body.checkIns).toEqual([
            expect.objectContaining({
                user_id: user.id,
                gym_id: gym.id
            }),
            expect.objectContaining({
                user_id: user.id,
                gym_id: gym.id
            })
        ])
        expect(response.body.checkIns).toHaveLength(2)
    })
})