import 'dotenv/config'
import { randomUUID } from 'crypto'
import type { Environment } from 'vitest'
import { execSync } from 'node:child_process'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

//postgresql://docker:docker@localhost:5432/ignitenode03?schema=public

function generateDatabaseUrl(schema: string) {
    if (!process.env.DATABASE_URL) {
        throw new Error('please inform the DATABASE_URL environment variable')
    }

    const url = new URL(process.env.DATABASE_URL)
    url.searchParams.set('schema', schema)
    return url.toString()

}

export default <Environment>{
    name: 'custom',
    transformMode: 'ssr',
    setup() {
        const schema = randomUUID()
        const databaseUrl = generateDatabaseUrl(schema)

        process.env.DATABASE_URL = databaseUrl
        execSync(`npx prisma migrate deploy`)
        console.log("----------------------CREATE----------------------")
        return {
            async teardown() {
        console.log("----------------------DELETE----------------------")

                await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
                await prisma.$disconnect()
            }
        }
    }
}