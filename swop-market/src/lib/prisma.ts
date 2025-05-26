import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import ws from "ws";

const prismaClientSingleton = () => {
  neonConfig.webSocketConstructor = ws;
  const connectionString = `${process.env.DATABASE_URL}`;

  const adapter = new PrismaNeon({ connectionString });
  const prisma = new PrismaClient({ adapter });

  return prisma;
};

declare const globalThis: {
  prisma: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const db = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
