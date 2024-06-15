import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./check-in";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberCheckInsError } from "./errors/max-number-of-check-ins-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('testing the check in use case', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        gymsRepository = new InMemoryGymsRepository()
        sut = new CheckInUseCase(checkInsRepository, gymsRepository)

        await gymsRepository.create({
            id: 'gym-01',
            title: 'liceu',
            phone: '',
            description: '',
            latitude: new Decimal(0),
            longitude: new Decimal(0),
        })

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be possible to create a check in', async () => {
        const { checkIn } = await sut.execute({ gymId: 'gym-01', userId: 'user-01', userLatitude: 0, userLongitude: 0 })
        expect(checkIn.id).toEqual(expect.any(String))
    })


    it('should not be possible to create a check in to invalid gym', async () => {
        await expect(() => sut.
            execute(
                {
                    gymId: 'invalid gym-id',
                    userId: 'user-01',
                    userLatitude: 0,
                    userLongitude: 0
                }
            )
        ).rejects.toBeInstanceOf(ResourceNotFoundError)

    })


    it('should not be possible not to create two check ins on the same day', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
        await sut.execute({ gymId: 'gym-01', userId: 'user-01', userLatitude: 0, userLongitude: 0 })
        await expect(sut.execute({ gymId: 'gym-01', userId: 'user-01', userLatitude: 0, userLongitude: 0 })
        ).rejects.toBeInstanceOf(MaxNumberCheckInsError)
    })

    it('should be possible to create two check ins on different days ', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
        await sut.execute({ gymId: 'gym-01', userId: 'user-01', userLatitude: 0, userLongitude: 0 })

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))
        const { checkIn } = await sut.execute({ gymId: 'gym-01', userId: 'user-01', userLatitude: 0, userLongitude: 0 })
        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should be possible not to create a gym outside the maximum distance', async () => {
        gymsRepository.items.push({
            id: 'gym-02',
            title: 'socrates',
            phone: '',
            description: '',
            latitude: new Decimal(1000),
            longitude: new Decimal(1000),
        })
        await expect(sut.execute({ gymId: 'gym-02', userId: 'user-01', userLatitude: 0, userLongitude: 0 })
        ).rejects.toBeInstanceOf(MaxDistanceError)

    })
})