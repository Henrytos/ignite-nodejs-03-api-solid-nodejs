import { CheckIn, Prisma } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "crypto";


export class InMemoryCheckInsRepository implements CheckInsRepository  {
    
    items:CheckIn[] = [ ]
    
    async findByUserIdOnDate(userId: string, date: Date) {
       const checkInOnSameDate = this.items.find(checkIn=>checkIn.user_id==userId)
        
       if(!checkInOnSameDate){
            return null
        }

        return checkInOnSameDate
    }
    
    async create(data:Prisma.CheckInUncheckedCreateInput){
        const check_in = {
            id:randomUUID(),
            user_id:data.user_id,
            gym_id:data.gym_id,
            created_at: data.created_at?new Date(data.created_at):new Date(),
            validated_at: data.validated_at?new Date(data.validated_at):null,
        }
        this.items.push(check_in);
        return check_in;
    }

}