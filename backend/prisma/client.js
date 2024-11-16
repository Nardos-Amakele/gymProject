const { PrismaClient } = require("@prisma/client");  // Import PrismaClient from the @prisma/client package

let prismaGlobal = global.prisma; // Global variable for Prisma instance in development

// Check if the global object already contains a Prisma client instance, if not, create a new one
const prisma = prismaGlobal || new PrismaClient(); 

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma; // Only assign the global instance in non-production environments
}

module.exports = prisma;  // Export the prisma instance for use in other files
