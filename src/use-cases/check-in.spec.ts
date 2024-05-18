import { afterEach, beforeEach, describe,  expect,  it , vi } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./check-in";

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase
describe('testing the check in use case',()=>{
    beforeEach(()=>{
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new CheckInUseCase(checkInsRepository)
        vi.useFakeTimers()
    })  

    afterEach(()=>{
        vi.useRealTimers()
    })

    it('should be possible to create a check in', async()=>{
        const {checkIn} = await sut.execute({gymId:'gym-01',userId:'user-01'} )
        expect(checkIn.id).toEqual(expect.any(String))
    })  


    it('should not be possible not to create two check ins on the same day', async()=>{
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
        await sut.execute({gymId:'gym-01',userId:'user-01'} )
        await expect(sut.execute({gymId:'gym-01',userId:'user-01'} )
        ).rejects.toBeInstanceOf(Error)
    })  

    it('should be possible to create two check ins on different days ', async()=>{
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
        await sut.execute({gymId:'gym-01',userId:'user-01'} )

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))
        const {checkIn} = await sut.execute({gymId:'gym-01',userId:'user-01'} )
        expect(checkIn.id).toEqual(expect.any(String))
    })  
})