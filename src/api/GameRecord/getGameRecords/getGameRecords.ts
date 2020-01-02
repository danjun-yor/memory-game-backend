import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    getGameRecords: async (_: any, args: any) => {
      return prisma.gameRecords({
        orderBy: "score_DESC"
      });
    }
  }
};
