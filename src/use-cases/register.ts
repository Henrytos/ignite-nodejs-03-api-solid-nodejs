import { UsersRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"
import { UserAlreadyExitsError } from "./errors/user-already-exits-error"

interface RegisterUseCaseRequest{
    name: string
    email:string 
    password:string
}
export class RegisterUseCase{
    constructor(private usersRepository:UsersRepository){
    }

    async execute({name,email,password}:RegisterUseCaseRequest){
       
        const userWithSameEmail = await this.usersRepository.findByEmail(email)
        
        if (userWithSameEmail) {
            throw new UserAlreadyExitsError()
        }
    
        const password_hash  = await hash(password, 6)
    
        const user = await this.usersRepository.create({
            name,
            email,
            password_hash
        })
        return {user }      
    }
}

