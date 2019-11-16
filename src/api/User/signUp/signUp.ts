import { prisma } from "../../../../generated/prisma-client";
import { APP_SECRET } from "../../../utils";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    signUp: async (_: any, args: any) => {
      const { name, email, password } = args;
      const bcryptPassword = await bcrypt.hash(password, 10);

      const exists = await prisma.$exists.user({ email });
      if (exists) {
        throw Error("이미 존재하는 이메일입니다.");
      }

      const user = await prisma.createUser({
        name,
        email,
        password: bcryptPassword
      });

      const token = jwt.sign({ userId: user.id }, APP_SECRET);

      return {
        token,
        user
      };
    }
  }
};
