import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

describe('test authenticate user',()=>{
    it('shoud authenticate user',async ()=>{
        const usersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateUseCase(usersRepository)
    
        await usersRepository.create({
          name: 'John Doe',
          email: 'johndoe@example.com',
          password_hash: await hash('123456', 6),
        })
    
        const { user } = await sut.execute({    
        email: 'johndoe@example.com',
        password: '123456',
        })
    
        expect(user.id).toEqual(expect.any(String))
    })

    it('should be possible not to access with the wrong password',async ()=>{
        const usersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateUseCase(usersRepository)
    
        await usersRepository.create({
          name: 'John Doe',
          email: 'johndoe@example.com',
          password_hash: await hash('123456', 6),
        })
    
        expect(sut.execute({    
            email: 'johndoe@example.com',
            password: '123123',
            })).rejects.toBeInstanceOf(InvalidCredentialsError)        
    })

    it('should be possible not to access with the wrong email',async ()=>{
        const usersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateUseCase(usersRepository)
    
        await usersRepository.create({
          name: 'John Doe',
          email: 'johndoe@example.com',
          password_hash: await hash('123456', 6),
        })
    
        expect(sut.execute({    
            email: 'test@example.com',
            password: '123456',
            })).rejects.toBeInstanceOf(InvalidCredentialsError)        
    })
})