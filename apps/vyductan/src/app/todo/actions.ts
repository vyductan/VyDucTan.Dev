"use server";

import { createServerAction } from "@vyductan/react/serverAction";
import { z } from "zod";

import { prisma } from "~/_server/prisma";
import { TodoModel } from "~/_zod";

export const todoService = {
  create: createServerAction(TodoModel)(async (data) => {
    await prisma.todo.create({
      data,
    });
  }),
  getAll: createServerAction()(async () => {
    return await prisma.todo.findMany();
  }),
  getById: createServerAction(z.string())(async (id) => {
    return await prisma.todo.findUnique({
      where: {
        id,
      },
    });
  }),
  setDone: createServerAction(
    z.object({ id: z.string(), isDone: z.boolean() }),
  )(async ({ id, isDone }) => {
    return await prisma.todo.update({
      where: {
        id,
      },
      data: {
        isDone,
      },
    });
  }),
};
