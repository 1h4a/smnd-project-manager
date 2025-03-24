import { PrismaClient } from "@prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"
import { Pool } from "@neondatabase/serverless"

/*const globalPrisma = global as unknown as { prisma: PrismaClient }
export const prisma = globalPrisma.prisma || new PrismaClient()

globalPrisma.prisma = prisma*/

export function createPrismaClient() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaNeon(pool);

    return new PrismaClient({ adapter: adapter });
}

export const prisma = createPrismaClient()

/*const globalForPrisma = globalThis as unknown as {

    prisma: PrismaClient | undefined

}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma*/