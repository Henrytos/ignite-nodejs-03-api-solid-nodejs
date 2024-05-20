import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { ValidateCheckInUseCase } from "./validate-check-in";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let checkInsRepository:CheckInsRepository
let sut:ValidateCheckInUseCase

describe('testing the fetch user check ins history use case',()=>{
    
    beforeEach(()=>{
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new ValidateCheckInUseCase(checkInsRepository)
        vi.useFakeTimers()
    })

    afterEach(()=>{
        vi.useRealTimers()
    })

    it('should validate user check in',async ()=>{
        const checkInCreated = await checkInsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01',
        })

        const { checkIn } = await sut.execute({
            checkInId: checkInCreated.id,
        })
       
        expect(checkIn.validated_at).toEqual(expect.any(Date))
    })

    it('should not validate user check in',async ()=>{
        await expect(()=>sut.execute({
            checkInId: 'invalid check in id',
        })).rejects.toBeInstanceOf(ResourceNotFoundError)
    })

})