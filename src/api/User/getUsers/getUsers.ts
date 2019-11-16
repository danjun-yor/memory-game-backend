import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    getUsers: async (_: any, args: any) => {
      return prisma.users();
    }
  }
};
