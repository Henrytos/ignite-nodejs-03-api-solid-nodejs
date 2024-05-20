import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository:InMemoryGymsRepository
let sut:CreateGymUseCase
describe('test create gym use cases ', ()=>{
    beforeEach(()=>{
        gymsRepository = new InMemoryGymsRepository()
        sut = new CreateGymUseCase(gymsRepository)
    })
   

    it('should create two gyms',async ()=>{
        await gymsRepository.create({
            latitude: 1000001,
            longitude: 1000001,
            title: 'javascript gym 1',
        })
        await gymsRepository.create({
            latitude: 1000001,
            longitude: 1000001,
            title: 'javascript gym 2',
        })
        expect(gymsRepository.items).toEqual([
            expect.objectContaining({
                title: 'javascript gym 1',
            }),
            expect.objectContaining({
                title: 'javascript gym 2',
            }),
        ])
    })
    it('should to create gym', async () => {
        const { gym } = await sut.execute({
            title: 'JavaScript Gym',
            description: null,
            phone: null,
            latitude: -27.2092052,
            longitude: -49.6401091,
            })
        
        expect(gym.id).toEqual(expect.any(String)) 
          
    })
})