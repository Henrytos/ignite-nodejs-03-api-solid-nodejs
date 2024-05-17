import { CheckIn, Prisma } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface CheckInUseCaseRequest{
    userId: string;
    gymId: string
}
interface CheckInUseCaseResponse{
    checkIn:Prisma.CheckInUncheckedCreateInput
}

export class CheckInUseCase{
    constructor(private checkInsRepository:CheckInsRepository){}
    async execute({ gymId , userId }: CheckInUseCaseRequest):Promise<CheckInUseCaseResponse>{
        const checkIn = await this.checkInsRepository.create({
            user_id: userId,
            gym_id: gymId,
            created_at: new Date()
        })
        return { checkIn }   
    }
}