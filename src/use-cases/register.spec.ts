import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { UserAlreadyExitsError } from './errors/user-already-exits-error'



describe('teste register user', ()=>{

    it('should be possible to create a user',async()=>{
        const repositoryUser = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(repositoryUser)
        const { user } = await registerUseCase.execute({
            name:'test',
            email:'test@example.com',
            password:'123456',
        })
        expect(user.email).toEqual('test@example.com')

    })

    it('should be possible not to register a duplicate email',async()=>{
        const repositoryUser = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(repositoryUser)
        await registerUseCase.execute({
            name:'test',
            email:'test@example.com',
            password:'123456',
        })
        await expect( registerUseCase.execute({
            name:'test',
            email:'test@example.com',
            password:'123456',
        })).rejects.toBeInstanceOf(UserAlreadyExitsError)
       
    })
    
    it('should must be possible to encrypt the password',async ()=>{
        const repositoryUser = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(repositoryUser)
        
        const {user} = await registerUseCase.execute({
            name:'test',
            email:'test@example.com',
            password:'123456',

        })
   
        const isPasswordCorrectlyHashed = await compare(
            '123456',
            user.password_hash,
          )

         expect(isPasswordCorrectlyHashed).toBe(true)

    })

})