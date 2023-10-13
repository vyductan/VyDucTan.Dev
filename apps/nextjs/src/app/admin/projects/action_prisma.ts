"use server";

import { createServerAction } from "@vyductan/react/serverAction";

import { prisma } from "~/_server/prisma";
import { AddProjectSchema, GetProjectByIdSchema } from "./schema";

export const getProjectsAction = createServerAction()(async () => {
  return await prisma.project.findMany();
});

export const getProjectByIdAction = createServerAction(GetProjectByIdSchema)(
  async ({ id }) => {
    return await prisma.project.findUnique({
      where: {
        id,
      },
      include: {
        tasks: true,
      },
    });
  },
);

export const addProjectAction = createServerAction(AddProjectSchema)(async (
  data,
) => {
  await prisma.project.create({
    data,
  });
});
