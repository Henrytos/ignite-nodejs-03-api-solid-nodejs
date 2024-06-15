import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { GetUserMetricsUseCase } from "./get-user-metrics";

let checkInsRepository: CheckInsRepository
let sut: GetUserMetricsUseCase

describe('testing the fetch user check ins history use case', () => {

    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new GetUserMetricsUseCase(checkInsRepository)
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

        const { checkInsCount } = await sut.execute({ userId: 'user-01' })
        expect(checkInsCount).toEqual(2)
    })

})