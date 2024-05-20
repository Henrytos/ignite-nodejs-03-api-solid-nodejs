import { GetUserMetricsUseCase } from "../get-user-metrics";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prism-check-in-repository";

export function makeGetUserMetricsUseCase() {
    const prismaCheckInsRepository = new PrismaCheckInsRepository()
    const useCase = new GetUserMetricsUseCase(prismaCheckInsRepository)
    return useCase
}