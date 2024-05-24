import { FastifyInstance } from "fastify"
import { metrics } from "./metrics"
import { validate } from "./validate"
import { create } from "./create"
import { history } from "./history"
import { verifyJwt } from "@/http/middlewares/verify-jwt"
import { verifyRoleUser } from "@/http/middlewares/verify-role-user"

export async function checkInsRoutes(app: FastifyInstance) {
    app.addHook("onRequest", verifyJwt)

    app.get('/check-ins/history', history)
    app.get('/check-ins/metrics', metrics)
    app.post('/gyms/:gymId/check-ins', create)
    app.patch('/check-ins/:checkInId/validate', { onRequest: verifyRoleUser('ADMIN') }, validate)

}
