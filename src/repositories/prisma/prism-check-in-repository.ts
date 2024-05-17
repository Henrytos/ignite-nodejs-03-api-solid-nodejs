import { prisma } from "@/lib/prisma";
import { CheckInsRepository } from "../check-ins-repository";
import { Prisma } from "@prisma/client";

export class PrismaCheckInsRepository implements CheckInsRepository{
    async create(data:Prisma.CheckInUncheckedCreateInput){
        const checkIn = await prisma.checkIn.create({
            data:{
                user_id:data.user_id,
                gym_id:data.gym_id,
                created_at: data.created_at?new Date(data.created_at):new Date(),
                validated_at: data.validated_at?new Date(data.validated_at):null,
            }
        })
        return checkIn;
    }
}  