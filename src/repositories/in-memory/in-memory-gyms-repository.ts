import { randomUUID } from "crypto";
import { FindManyNearbyParams, GymsRepository } from "../gyms-repository";
import { Gym, Prisma } from "@prisma/client";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-cordanetes";


export class InMemoryGymsRepository implements GymsRepository {


    items: Gym[] = []
    async searchMany(query: string, page: number) {
        return this.items
            .filter(item => item.title.includes(query))
            .slice((page - 1) * 20, page * 20)
    }

    async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
        return this.items.filter(item => {
            const distance = getDistanceBetweenCoordinates({
                latitude,
                longitude
            },
                {
                    latitude: item.latitude.toNumber(),
                    longitude: item.longitude.toNumber()
                }
            )

            return distance < 10
        })
    }

    async create(data: Prisma.GymCreateInput) {
        const gym: Gym = {
            id: data.id ?? randomUUID(),
            title: data.title,
            phone: data.phone ?? null,
            description: data.description ?? null,
            longitude: new Prisma.Decimal(data.longitude.toString()),
            latitude: new Prisma.Decimal(data.latitude.toString()),

        }
        this.items.push(gym);
        return gym;

    }

    async findById(id: string) {
        const gym = this.items.find(gym => gym.id === id);

        if (!gym) {
            return null
        }

        return gym
    }

}