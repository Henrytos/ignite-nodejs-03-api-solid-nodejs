import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";


export class InMemoryUsersRepository implements UsersRepository  {
    
    users:User[] = [ ]

    async create(data:Prisma.UserCreateInput){
        const user:User = {
            id:'1',
            name:data.name,
            email:data.email,
            password_hash:data.password_hash,
            created_at:new Date(),
        }
        this.users.push(user);
        return user;
    }

    async findByEmail(email: string) {
        const user = this.users.find(user=>user.email === email);
        return user || null;
    }

    async findById(id: string) {
        const user = this.users.find(user=>user.id === id);
        return user || null;
    }
}