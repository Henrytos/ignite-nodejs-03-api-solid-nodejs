import { verifyJwt } from "@/middlewares/verify-jwt"
import { FastifyInstance } from "fastify"
import { metrics } from "./metrics"
import { validate } from "./validate"
import { create } from "./create"
import { history } from "./history"

export async function gymsRoutes(app: FastifyInstance) {
    app.addHook("onRequest", verifyJwt)

    app.get('/check-ins/history', history)
    app.get('/check-ins/metrics', metrics)
    app.post('/gyms/:gymId/check-ins', create)
    app.patch('/check-ins/:checkInId/validate', validate)

}
