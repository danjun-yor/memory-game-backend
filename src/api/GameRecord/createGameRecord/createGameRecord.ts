import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createRecord: async (_: any, args: any) => {
      const { score, stage, playTime } = args;

      await prisma.createGameRecord({
        score,
        stage,
        playTime
      });
      return true;
    }
  }
};
