import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    getRecords: async (_: any, args: any) => {
      return prisma.records({
        orderBy: "score_DESC"
      });
    }
  }
};
