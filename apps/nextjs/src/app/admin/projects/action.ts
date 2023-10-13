"use server";

import { createServerAction } from "@vyductan/react/serverAction";

import { notion } from "~/_server/notion";
import { prisma } from "~/_server/prisma";
import { AddProjectSchema, GetProjectByIdSchema } from "./schema";

export const getProjectsAction = createServerAction()(async () => {
  // https://www.notion.so/vyductan/329428b8b2bd4d0189aecb2c56fa3e82
  return await notion.databases.query({
    database_id: "329428b8b2bd4d0189aecb2c56fa3e82",
  });
});

export const getProjectByIdAction = createServerAction(GetProjectByIdSchema)(
  async ({ id }) => {
    return await notion.pages.retrieve({
      page_id: id,
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
