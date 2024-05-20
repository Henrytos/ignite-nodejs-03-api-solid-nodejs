import { PrismaCheckInsRepository } from "@/repositories/prisma/prism-check-in-repository";
import { ValidateCheckInUseCase } from "../validate-check-in";

export function makeValidateCheckInUseCase() {
    const prismaCheckInsRepository = new PrismaCheckInsRepository()
    const useCase = new ValidateCheckInUseCase(prismaCheckInsRepository)
    return useCase
}