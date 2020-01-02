import { prisma, GameRecord, User } from "../../../../generated/prisma-client";
import { APP_SECRET } from "../../../utils";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default {
  Query: {
    signIn: async (_: any, { email, password }: any) => {
      const existsEmail = await prisma.$exists.user({ email });

      if (!existsEmail) {
        throw Error("Email not exists.");
      }

      const user = await prisma.user({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ id: user.id }, APP_SECRET);
        return {
          token
        };
      }
      throw Error("Password is wrong.");
    }
  }
};
