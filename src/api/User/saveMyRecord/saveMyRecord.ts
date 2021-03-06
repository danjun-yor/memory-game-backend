import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    saveMyRecord: async (
      _: any,
      { score, stage, playTime }: any,
      context: any,
      info: any
    ) => {
      try {
        const userExists = await prisma.$exists.user({
          id: context.id
        });

        if (!userExists) {
          throw new Error("You need to be authenticated.");
        }

        await prisma.updateUser({
          data: {
            records: {
              create: {
                score,
                stage,
                playTime
              }
            }
          },
          where: { id: context.id }
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
