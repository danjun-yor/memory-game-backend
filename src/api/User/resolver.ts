import {
  prisma,
  UserPromise,
  GameRecord,
  User
} from "../../../generated/prisma-client";
import { APP_SECRET } from "../../utils";
import { gql } from "apollo-server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default {
  Query: {
    getUsers: async (_: any, args: any) => {
      // prisma.$graphql()
      return prisma.users();
    }
  },

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
    },

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

      const token = jwt.sign({ id: user.id }, APP_SECRET);

      return {
        token,
        user: {
          email: user.email,
          name: user.name,
          records: []
        }
      };
    }
  }
};
