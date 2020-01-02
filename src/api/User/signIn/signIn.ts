import { prisma, GameRecord, User } from "../../../../generated/prisma-client";
import { APP_SECRET } from "../../../utils";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    signIn: async (_: any, args: any) => {
      const { email, password } = args;
      const isValid = await prisma.$exists.user({ email, password });

      if (!isValid) {
        throw Error("Login failed");
      }

      const user = await prisma.user({ email }).$fragment<
        User & {
          records: GameRecord[];
        }
      >(`
        fragment UserWithRecords on User {
          email
          records {
            score
          }
        }
      `);

      if (user) {
        const { id, records } = user;
        const token = jwt.sign({ id }, APP_SECRET);
        return {
          token,
          user: {
            email,
            name,
            records
          }
        };
      }
      return false;
    }
  }
};
