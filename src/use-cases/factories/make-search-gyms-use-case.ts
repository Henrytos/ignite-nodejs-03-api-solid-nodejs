import { SearchGymsUseCase } from "../search-gyms";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeSearchGymsUseCase() {
    const prismaGymsRepository = new PrismaGymsRepository()
    const useCase = new SearchGymsUseCase(prismaGymsRepository)
    return useCase
}