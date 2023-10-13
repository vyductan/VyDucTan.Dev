"use server";

import { createServerAction } from "@vyductan/react/serverAction";
import { z } from "zod";

import { prisma } from "~/_server/prisma";
import { VocabularyModel } from "~/_zod";

export const getVocabulariesAction = createServerAction()(async () => {
  return await prisma.vocabulary.findMany();
});

export const getVocabularyByIdAction = createServerAction(z.string())(async (
  id,
) => {
  return await prisma.project.findUnique({
    where: {
      id,
    },
    include: {
      tasks: true,
    },
  });
});

export const addProjectAction = createServerAction(VocabularyModel)(async (
  data,
) => {
  await prisma.vocabulary.create({
    data,
  });
});
