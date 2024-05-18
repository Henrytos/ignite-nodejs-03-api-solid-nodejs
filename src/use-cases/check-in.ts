import { CheckIn, Prisma } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface CheckInUseCaseRequest{
    userId: string;
    gymId: string
    userLatitude:number
    userLongitude:number
}
interface CheckInUseCaseResponse{
    checkIn:Prisma.CheckInUncheckedCreateInput
}

export class CheckInUseCase{
    constructor(private checkInsRepository:CheckInsRepository, private gymsRepository:GymsRepository){}
    async execute({ gymId , userId, userLatitude , userLongitude }: CheckInUseCaseRequest):Promise<CheckInUseCaseResponse>{
        
        const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(userId,new Date())
        
        const gym = await this.gymsRepository.findById(gymId)
        // TODO: fazer calculo de distancia entre usuario e academia 
        if(!gym){
            throw new ResourceNotFoundError()
        }

        if(checkInOnSameDate){
            throw new Error('error')
        }

        const checkIn = await this.checkInsRepository.create({
            user_id: userId,
            gym_id: gymId,
            created_at: new Date()
        })

        return { checkIn }   
    }
}