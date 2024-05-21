import { FastifyInstance } from "fastify";
import { create } from "./create";
import { verifyJwt } from "@/middlewares/verify-jwt";



export async function gymsRoutes(app: FastifyInstance) {
    app.addHook("onRequest", verifyJwt)

    app.post('/gyms', create)
}
