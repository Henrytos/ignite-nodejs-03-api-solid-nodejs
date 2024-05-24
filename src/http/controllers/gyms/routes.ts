import { FastifyInstance } from "fastify";
import { create } from "./create";
import { search } from "./search";
import { nearby } from "./nearby";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { verifyRoleUser } from "@/http/middlewares/verify-role-user";



export async function gymsRoutes(app: FastifyInstance) {
    app.addHook("onRequest", verifyJwt)
    app.get('/gyms/search', search)
    app.get('/gyms/nearby', nearby)
    app.post('/gyms', { onRequest: [verifyRoleUser('ADMIN')] }, create)
}
