import { makeGetUserProfileUseCase } from "@/use-cases/factories/make-get-user-profile-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply) {

    const useCase = makeGetUserProfileUseCase()
    const { user } = await useCase.execute({ id: request.user.sub })

    return reply.status(200).send({
        user: {
            ...user,
            password_hash: undefined
        }
    })
}