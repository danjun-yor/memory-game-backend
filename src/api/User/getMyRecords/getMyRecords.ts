import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    getMyRecords: async (_: any, args: any, context: any) => {
      return await prisma
        .user({
          id: context.id
        })
        .records();
    }
  }
};
