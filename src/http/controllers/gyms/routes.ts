import { FastifyInstance } from "fastify";
import { create } from "./create";
import { verifyJwt } from "@/middlewares/verify-jwt";
import { search } from "./search";
import { nearby } from "./nearby";



export async function gymsRoutes(app: FastifyInstance) {
    app.addHook("onRequest", verifyJwt)
    app.get('/gyms/search', search)
    app.get('/gyms/nearby', nearby)
    app.post('/gyms', create)
}
