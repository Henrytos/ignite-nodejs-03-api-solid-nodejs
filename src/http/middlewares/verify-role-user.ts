import { FastifyReply, FastifyRequest } from "fastify";

export function verifyRoleUser(roleToVerified: 'ADMIN' | 'MEMBER') {
    return async (req: FastifyRequest, reply: FastifyReply) => {
        const { role } = req.user
        if (role != roleToVerified) {
            return reply.status(401).send({
                message: 'Invalid role'
            })
        }
    }
}