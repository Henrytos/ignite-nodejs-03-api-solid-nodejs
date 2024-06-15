import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { FetchUserCheckInsHistoryUseCase } from "./fetch-user-check-ins-history";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

let checkInsRepository: CheckInsRepository
let sut: FetchUserCheckInsHistoryUseCase

describe('testing the fetch user check ins history use case', () => {

    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository)
    })

    afterEach(() => {
    })

    it('should be two check ins history', async () => {
        await checkInsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01',
        })
        await checkInsRepository.create({
            gym_id: 'gym-02',
            user_id: 'user-01',
        })

        const { checkIns } = await sut.execute({
            userId: 'user-01',
            page: 1
        })

        expect(checkIns).toEqual([
            expect.objectContaining({
                user_id: 'user-01',
            }),
            expect.objectContaining({
                user_id: 'user-01',
            })
        ])
    })
    it('should get second check ins page', async () => {

        for (let i = 1; i <= 22; i++) {
            await checkInsRepository.create({
                gym_id: `gym-${i}`,
                user_id: 'user-01',
            })
        }

        const { checkIns } = await sut.execute({
            userId: 'user-01',
            page: 2
        })

        expect(checkIns).toEqual([
            expect.objectContaining({
                gym_id: 'gym-21',
            }),
            expect.objectContaining({
                gym_id: 'gym-22',
            })
        ])
    })
})