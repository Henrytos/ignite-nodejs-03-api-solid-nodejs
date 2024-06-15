import { SearchGymsUseCase } from './search-gyms'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase
describe('teste register use cases ', () => {
    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new SearchGymsUseCase(gymsRepository)
    })


    it('should look for gyms through search', async () => {
        await gymsRepository.create({
            latitude: -27.2092052,
            longitude: -27.2092052,
            title: 'javascript gym',
        })
        await gymsRepository.create({
            latitude: -27.2092052,
            longitude: -27.2092052,
            title: 'javascript gym 2',
        })

        const { gyms } = await sut.execute({ query: 'javascript', page: 1 })
        expect(gyms.length).toEqual(2)
    })


    it('you should look for gyms using the search on page two', async () => {

        for (let i = 1; i <= 22; i++) {
            await gymsRepository.create({
                latitude: -27.2092052,
                longitude: -27.2092052,
                title: `javascript gym ${i}`,
            })
        }

        const { gyms } = await sut.execute({ query: 'javascript', page: 2 })
        expect(gyms.length).toEqual(2)
    })

})