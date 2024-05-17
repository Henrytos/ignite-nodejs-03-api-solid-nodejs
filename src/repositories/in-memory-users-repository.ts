import { Prisma } from "@prisma/client";


export class InMemoryUsersRepository {
    users:any = [ ]

    async create(data:Prisma.UserCreateInput){
        this.users.push(data);
        console.log(data)
    }
}