import "reflect-metadata";

import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";

import { UserResolver } from "./resolvers/UserResolver";
import { GraphQLError } from "graphql";
import type { IContext } from "./types/interfaces";

export const prisma = new PrismaClient();

const getUserFromToken = (token: string): string | JwtPayload => {
    try {
        if (token) {
            const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            return user;
        }
        return null;
    } catch (error) {
        throw new GraphQLError(`GET_USER_FROM_TOKEN_ERROR ${error}`);
    }
};

const startServer = async (): Promise<void> => {
    try {
        const schema = await buildSchema({
            resolvers: [UserResolver],
        });

        const server = new ApolloServer<IContext>({
            schema,
        });

        const { url } = await startStandaloneServer(server, {
            context: async ({ req }) => {
                if (process.env.ACCESS_TOKEN_SECRET === undefined) throw new GraphQLError("No secret JWT access token provided");
                if (req.headers.authorization === undefined) return {};

                const token = req.headers.authorization || "";
                const user = getUserFromToken(token);
                return { user };
            },

            listen: { port: 4000 },
        });

        console.log(`🚀  Server ready at: ${url}`);
    } catch (error) {
        console.log(error);
    }
};

void startServer();
