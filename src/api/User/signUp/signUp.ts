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
        throw new Error("이미 등록된 이메일입니다.");
      }

      const user = await prisma.createUser({
        name,
        email,
        password: bcryptPassword
      });

      const token = jwt.sign({ id: user.id }, APP_SECRET);

      return {
        token
      };
    }
  }
};
