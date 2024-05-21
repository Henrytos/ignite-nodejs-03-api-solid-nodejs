import { GymsRepository } from "@/repositories/gyms-repository"

interface CreateGymUseCaseRequest {
    title: string
    description: string | null
    phone: string | null
    latitude: number
    longitude: number

}
export class CreateGymUseCase {
    constructor(private gymsRepository: GymsRepository) {
    }

    async execute({ title, description, latitude, longitude, phone }: CreateGymUseCaseRequest) {
        const gym = await this.gymsRepository.create(
            {
                title,
                description,
                latitude,
                longitude,
                phone
            }
        )


        return { gym }
    }
}

