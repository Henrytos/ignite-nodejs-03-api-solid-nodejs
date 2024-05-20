import { randomUUID } from "crypto";
import { GymsRepository } from "../gyms-repository";
import { Gym, Prisma } from "@prisma/client";


export class InMemoryGymsRepository implements GymsRepository  {
    
    
    items:Gym[] = [ ]
    
    async create(data: Prisma.GymCreateInput) {
        const gym:Gym = {
            id:data.id??randomUUID(),
            title:data.title,
            phone:data.phone??null,
            description:data.description??null,
            longitude:new Prisma.Decimal(data.longitude.toString()),
            latitude:new Prisma.Decimal(data.latitude.toString()),
            
        }
        this.items.push(gym);
        return gym;
    
    }
    
    async findById(id: string) {
        const gym = this.items.find(gym=>gym.id === id);
        
        if( !gym ){
            return null
        }      
        
        return gym
    }

}