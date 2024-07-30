import type { AdapterAccountType } from "next-auth/adapters";
import { relations, sql } from "drizzle-orm";
import {
  integer,
  json,
  pgEnum,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
