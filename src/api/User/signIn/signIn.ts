import { prisma } from "../../../../generated/prisma-client";
import { APP_SECRET } from "../../../utils";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    signIn: async (_: any, { email, password }: any) => {
      const existsEmail = await prisma.$exists.user({ email });

      if (!existsEmail) {
        throw new Error("이메일을 확인해주세요.");
      }

      const user = await prisma.user({ email });
      const records = await prisma.user({ email }).records();

      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ ...user, records: [...records] }, APP_SECRET);
        return {
          token
        };
      }
      throw new Error("비밀번호를 잘못 입력했습니다.");
    }
  }
};
