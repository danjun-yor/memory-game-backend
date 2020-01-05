import { prisma, GameRecord, User } from "../../../../generated/prisma-client";
import { APP_SECRET } from "../../../utils";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    signIn: async (_: any, { email, password }: any) => {
      const existsEmail = await prisma.$exists.user({ email });

      if (!existsEmail) {
        throw new Error("Email not exists.");
      }

      const user = await prisma.user({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ id: user.id }, APP_SECRET);
        return {
          token
        };
      }
      throw new Error("Password is wrong.");
    }
  }
};
