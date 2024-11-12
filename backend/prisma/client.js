const { PrismaClient } = require("@prisma/client");

let prismaGlobal;

const prismaClientSingleton = () => {
  return new PrismaClient();
};

const prisma = prismaGlobal || prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  prismaGlobal = prisma;
}

module.exports = prisma;
