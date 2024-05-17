import { UserAlreadyExitsError } from '@/use-cases/errors/user-already-exits-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })
  const { name, email, password } = registerBodySchema.parse(req.body)
  
  try {
    const registerUseCase = makeRegisterUseCase()
    await registerUseCase.execute({email ,name ,password })
  } catch (error) {
    if( error instanceof UserAlreadyExitsError){
      return reply.status(409).send({message:error.message}) //conflito
    }
    throw error //jogando pra camada de cima
  }
  return reply.status(201).send()
}
