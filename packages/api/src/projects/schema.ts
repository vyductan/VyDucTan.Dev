import { relations } from "drizzle-orm";
import { json, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

export const todoStatusEnum = pgEnum("todo_status", [
  "",
  "not_started",
  "in_progress",
  "in_review",
  "done",
  "archived",
]);

export const projects = pgTable("project", {
  id: text("id")
    .$defaultFn(() => nanoid())
    .default("")
    .notNull()
    .primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique().default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const projectsRelations = relations(projects, ({ many }) => ({
  tasks: many(tasks),
}));

export const tasks = pgTable("task", {
  id: text("id")
    .$defaultFn(() => nanoid())
    .default("")
    .notNull()
    .primaryKey(),
  name: text("name").notNull(),
  status: todoStatusEnum("status").default("").notNull(),
  dueDate: timestamp("due_date").array(2),
  description: text("description"),
  content: json("content"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),

  parentId: text("parent_id"),
  projectId: text("project_id")
    .references(() => projects.id, {
      onDelete: "cascade",
    })
    .default("")
    .notNull(),
});

export const tasksRelations = relations(tasks, ({ one, many }) => ({
  project: one(projects, {
    fields: [tasks.projectId],
    references: [projects.id],
  }),
  parrent: one(tasks, {
    fields: [tasks.parentId],
    references: [tasks.id],
  }),
  children: many(tasks),
}));

// [
//     {
//         "id": 40896,
//         "updated_at": "2023-12-29T01:10:03.507325+08:00",
//         "name": "Test",
//         "description": null,
//         "estimated_workload": 0.0,
//         "estimated_start_time": "2023-12-04T01:00:00+08:00",
//         "estimated_end_time": "2023-12-07T00:59:59.999000+08:00",
//         "actual_workload": 0.0,
//         "actual_start_time": "2023-12-28T08:00:00+08:00",
//         "actual_end_time": "2023-12-29T00:53:43.351934+08:00",
//         "status": 99,
//         "risk": 40,
//         "order": 2,
//         "is_deleted": false,
//         "type": "story",
//         "number_of_subtask": 1,
//         "number_of_unfinished_subtask": 0,
//         "subtask_estimated_workload": 0.0,
//         "subtask_actual_workload": 0.0,
//         "parent_path": "",
//         "parent_id": null,
//         "calculate_workload_from_subtask": true,
//         "thirdparty": "",
//         "thirdparty_id": "",
//         "created_at": "2023-12-04T12:09:48.936366+08:00",
//         "team": 262,
//         "sprint": null,
//         "assignee": null,
//         "creator": 7933,
//         "enterprise": 497,
//         "collaborators": [],
//         "team_id": 262,
//         "sprint_id": null,
//         "assignee_id": null,
//         "collaborator_ids": [],
//         "tags": [],
//         "successor_ids": [],
//         "project_permission": 3,
//         "children": [
//             {
//                 "id": 40897,
//                 "updated_at": "2023-12-04T12:15:12.854215+08:00",
//                 "name": "test sub",
//                 "description": "jkhkjh\nasd\nas\nd",
//                 "estimated_workload": 0.0,
//                 "estimated_start_time": "2023-12-04T01:00:00+08:00",
//                 "estimated_end_time": "2023-12-07T00:59:59.999000+08:00",
//                 "actual_workload": 0.0,
//                 "actual_start_time": "2023-12-04T08:00:00+08:00",
//                 "actual_end_time": "2023-12-04T12:10:47.581238+08:00",
//                 "status": 99,
//                 "risk": 0,
//                 "order": 1,
//                 "is_deleted": false,
//                 "type": "bug",
//                 "number_of_subtask": 0,
//                 "number_of_unfinished_subtask": 0,
//                 "subtask_estimated_workload": 0.0,
//                 "subtask_actual_workload": 0.0,
//                 "parent_path": "40896/",
//                 "parent_id": 40896,
//                 "calculate_workload_from_subtask": false,
//                 "thirdparty": "",
//                 "thirdparty_id": "",
//                 "created_at": "2023-12-04T12:10:21.493075+08:00",
//                 "team": 262,
//                 "sprint": null,
//                 "assignee": null,
//                 "creator": 7933,
//                 "enterprise": 497,
//                 "collaborators": [],
//                 "team_id": 262,
//                 "sprint_id": null,
//                 "assignee_id": null,
//                 "collaborator_ids": [],
//                 "tags": [],
//                 "successor_ids": [],
//                 "project_permission": 3,
//                 "children": []
//             }
//         ]
//     }
// ]
