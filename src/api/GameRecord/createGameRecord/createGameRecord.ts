import { prisma } from "../../../../generated/prisma-client";
import { ResolverFn } from "apollo-server";

export default {
  Mutation: {
    createGameRecord: async (
      _: any,
      { score, stage, playTime }: any,
      context: any,
      info: any
    ) => {
      const userExists = await prisma.$exists.user({
        id: context.id
      });

      if (!userExists) {
        throw new Error("You need to be authenticated.");
      }

      await prisma.createGameRecord({
        score,
        stage,
        playTime
      });
      return true;
    }
  }
};
