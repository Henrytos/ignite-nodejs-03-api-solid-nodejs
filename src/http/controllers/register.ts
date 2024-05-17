import { prisma } from '@/utils/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { hash } from 'bcryptjs'

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
  })
  const { name, email, password } = registerBodySchema.parse(req.body)
  const userWithSameEmail = await prisma.user.findUnique({ where: { email } })

  if (userWithSameEmail) {
    return reply.status(504).send({ message: 'Email already exists' })
  }
  //1->d9qeh08he023
  //2->3re23r23r232344
  //3->j=0935jj=8yj304yj349-ytj9y-30p
  //3->85nh4g94h5t975g9t73082-=r32hj8r32=hyr8023=34
  //5->8i2=h3re=2843hj032j40=34j34i8j304j=034j93i49-3403ir9-23i
  //6->$2a$06$7bt/tSgbR2h21rdTs4TGRO3S2QR3LX5bWTckRx87XKfDoMOuT5R2O
  const password_hash  = await hash(password, 6)

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  })
  return reply.status(201).send()
}
