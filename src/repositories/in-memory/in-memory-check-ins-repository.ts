import { CheckIn, Prisma } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "crypto";
import dayjs from "dayjs";


export class InMemoryCheckInsRepository implements CheckInsRepository {
    async findById(id: string) {
        const checkIn = this.items.find(checkIn => checkIn.id === id);
        if (!checkIn) {
            return null
        }
        return checkIn
    }
    async save(checkIn: CheckIn) {
        const checkInIndex = this.items.findIndex(item => item.id === checkIn.id)
        if (checkInIndex >= 0) {
            this.items[checkInIndex] = checkIn

        }
        return checkIn
    }

    items: CheckIn[] = []

    async countByUserId(userId: string) {
        return this.items
            .filter(item => item.user_id === userId).length
    }


    async findManyByUserId(userId: string, page: number) {

        return this.items
            .filter(item => item.user_id === userId)
            .slice((page - 1) * 20, page * 20)
    }

    async findByUserIdOnDate(userId: string, date: Date) {
        const startOfTheDay = dayjs(date).startOf("date")
        const endOfTheDay = dayjs(date).endOf("date")

        const checkInOnSameDate = this.items.find(checkIn => {
            const checkInDate = dayjs(checkIn.created_at)
            const inSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

            return checkIn.user_id == userId && inSameDate
        })

        if (!checkInOnSameDate) {
            return null
        }

        return checkInOnSameDate
    }

    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const check_in = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            created_at: data.created_at ? new Date(data.created_at) : new Date(),
            validated_at: data.validated_at ? new Date(data.validated_at) : null,
        }
        this.items.push(check_in);
        return check_in;
    }

}