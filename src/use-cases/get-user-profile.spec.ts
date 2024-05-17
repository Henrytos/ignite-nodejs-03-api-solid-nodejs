import { beforeEach, describe, expect, it } from "vitest";
import { GetUserProfileUseCase } from "./get-user-profile";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase
describe('tests for get user profile',()=>{
    beforeEach(()=>{
        usersRepository = new InMemoryUsersRepository()
        sut = new GetUserProfileUseCase(usersRepository)
    })  

    it('should be able to get user profile', async()=>{
        const userCreated = await usersRepository.create({
            name:'test',
            email:'test@example.com',
            password_hash: await hash('123456',6),
        })
        const { user } = await sut.execute({ id : userCreated.id })
        expect(user.name).toEqual('test')
        
    })  
})