
import { GetUserProfileUseCase } from "./get-user-profile";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase
describe('tests for get user profile', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new GetUserProfileUseCase(usersRepository)
    })

    it('should be able to get user profile', async () => {
        const userCreated = await usersRepository.create({
            name: 'test',
            email: 'test@example.com',
            password_hash: await hash('123456', 6),
        })
        const { user } = await sut.execute({ id: userCreated.id })
        expect(user.name).toEqual('test')

    })

    it('should not be able to get user profile', async () => {
        await usersRepository.create({
            name: 'test',
            email: 'test@example.com',
            password_hash: await hash('123456', 6),
        })
        await expect(
            sut.execute({ id: 'invalid_id' })
        ).rejects.toBeInstanceOf(ResourceNotFoundError)

    })
})