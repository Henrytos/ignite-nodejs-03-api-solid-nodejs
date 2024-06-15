import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { UserAlreadyExitsError } from './errors/user-already-exits-error'

let repositoryUsers: InMemoryUsersRepository
let sut: RegisterUseCase
describe('teste register use cases ', () => {
    beforeEach(() => {
        repositoryUsers = new InMemoryUsersRepository()
        sut = new RegisterUseCase(repositoryUsers)
    })
    it('should be possible to create a user', async () => {
        const { user } = await sut.execute({
            name: 'test',
            email: 'test@example.com',
            password: '123456',
        })
        expect(user.email).toEqual('test@example.com')

    })

    it('should be possible not to register a duplicate email', async () => {
        await sut.execute({
            name: 'test',
            email: 'test@example.com',
            password: '123456',
        })
        await expect(sut.execute({
            name: 'test',
            email: 'test@example.com',
            password: '123456',
        })).rejects.toBeInstanceOf(UserAlreadyExitsError)

    })

    it('should must be possible to encrypt the password', async () => {
        const { user } = await sut.execute({
            name: 'test',
            email: 'test@example.com',
            password: '123456',

        })

        const isPasswordCorrectlyHashed = await compare(
            '123456',
            user.password_hash,
        )

        expect(isPasswordCorrectlyHashed).toBe(true)

    })

})