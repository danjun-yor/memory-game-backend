import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createUser: async (_: any, args: any) => {
      const { name, email, password } = args;
      const exists = await prisma.$exists.user({ name });
      if (exists) {
        throw Error("This username is already taken");
      }
      await prisma.createUser({
        name,
        email,
        password
      });
      return true;
    }
  }
};
