import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

export async function authenticate(req: FastifyRequest, reply: FastifyReply) {

  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(req.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()
    const { user } = await authenticateUseCase.execute({ email, password })

    const token = await reply.jwtSign({
      role: user.role,
    },
      {
        sign: {
          sub: user.id,
        }
      }
    )

    const refreshToken = await reply.jwtSign({
      role: user.role,
    },
      {
        sign: {
          sub: user.id,
          expiresIn: '7d'
        },
      }
    )

    return reply.status(200)
      .setCookie('refreshToken', refreshToken, {
        path: '/',//verify domain
        httpOnly: true,//not util javascript front 
        secure: true,//only https
        sameSite: true//only same domain 
      })
      .send({
        token
      })

  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }


}
