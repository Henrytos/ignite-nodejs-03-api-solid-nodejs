import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'
import { UserAlreadyExitsError } from '@/use-cases/errors/user-already-exits-error'
import { RegisterUseCase } from '@/use-cases/register'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
  })
  const { name, email, password } = registerBodySchema.parse(req.body)
  
  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    //const UsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(prismaUsersRepository)
    await registerUseCase.execute({email ,name ,password })
  } catch (error) {
    if( error instanceof UserAlreadyExitsError){
       /**O status de resposta 409 Conflict indica que 
     * a solicitação atual conflitou com 
     * o recurso que está no servidor. */
      return reply.status(409).send({message:error.message})
    }
    return reply.status(500).send()
  }
  return reply.status(201).send()
}
