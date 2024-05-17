import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"

interface RegisterUseCaseRequest{
    name: string
    email:string 
    password:string
}
export class RegisterUseCase{
    private UsersRepository:any
    constructor(UsersRepository:any){
        this.UsersRepository = UsersRepository
    }

    async execute({name,email,password}:RegisterUseCaseRequest){
        const userWithSameEmail = await prisma.user.findUnique({ where: { email } })

        if (userWithSameEmail) {
            throw new Error( 'Email already exists' )
        }
    
        const password_hash  = await hash(password, 6)
    
        this.UsersRepository.create({
            name,
            email,
            password_hash
        })
    }
}

