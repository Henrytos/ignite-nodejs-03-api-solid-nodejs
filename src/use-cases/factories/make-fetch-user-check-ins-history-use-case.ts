import { FetchUserCheckInsHistoryUseCase } from "../fetch-user-check-ins-history"
import { PrismaCheckInsRepository } from "@/repositories/prisma/prism-check-in-repository"

export function makeFetchUseCheckInsHistoryUseCase() {
    const prismaCheckInsRepository = new PrismaCheckInsRepository()
    const useCase = new FetchUserCheckInsHistoryUseCase(prismaCheckInsRepository)
    return useCase
}