import fs from "fs";
import type { PgEnum, PgTable } from "drizzle-orm/pg-core";
import {
  getTableColumns,
  getTableName,
  is,
  isTable as isDrizzleTable,
  relations,
} from "drizzle-orm";
import { getTableConfig, PgColumn, pgEnum } from "drizzle-orm/pg-core";

// import x from "drizzle-orm/utils";

import { schema } from "@acme/db";

import { DB_PREFIX } from "../db/src/schema/_table";

const isEnum = (obj) => {
  // return is(obj, PpEnum)
  return (
    typeof obj === "object" &&
    "enumValues" in obj &&
    Array.isArray(obj.enumValues) &&
    obj.enumValues.length > 0
  );
};
const isTable = (obj): obj is PgTable => {
  return isDrizzleTable(obj);
  // return is(obj, PgTable);
  return "$inferSelect" in obj;
};
const isColumn = (obj) => {
  return is(obj, PgColumn);
  return "dataType" in obj;
};
// console.log(
//   "schema",
//   // schema.accounts,
//   // schema.accounts,
//   getTableConfig(schema.accounts).foreignKeys,
//   relations("vp_accounts", (h, m) => {
//     console.log("h", h, m);
//   }),
// );
const g = (s = schema, res = "", isRoot = true) => {
  console.log(
    "xxxx",
    // s.accounts.userId.dataType,
    // isDrizzleTable(s.words),
    // isDrizzleTable(s.masteryEnum),
    // getTableName(s.accounts),
    // s.words.$inferSelect,
    // res,
    // s.words._.name,
    // isEnum(s.masteryEnum),
    // s.masteryEnum.schema,
    // s.masteryEnum.enumName,
    // s.masteryEnum.name,
    // s.masteryEnum.enumValues,
  );
  // Object.entries(s.words.).map((x) => console.log(x));
  Object.entries(s).forEach(([key, value]) => {
    console.log("xx", isRoot, key);
    if (key === "status") {
      console.log("ccccccc", value, value.config.enum);
    }
    if (key === "userId") {
      console.log("uuuuuuu", isTable(value), isColumn(value));
    }

    if (isTable(value)) {
      const table = value;
      console.log("table", key);

      const tableName = key; // getTableName(table).replace(DB_PREFIX, "");
      res += "/** @gqlType */\n";
      res += `type ${tableName.charAt(0).toUpperCase() + tableName.slice(1)} = {\n`;
      const columns = getTableColumns(table);
      // const columnEntries = Object.entries(columns);
      // columnEntries.forEach(([key, value]) => {
      //   res += g(value, res, false);
      // });
      res = g(columns, res, false);
      res += "}\n\n";
      // columns.forEach((c) => {})
      // console.log("vv", value);
      // g(value, res);
    }
    if (isColumn(value)) {
      const column = value;
      res += `/** @gqlField */\n`;
      res += `${key}${column.notNull ? "" : "?"}: ${column.dataType};\n`;
    }
    // if (isEnum(value)) {
    //   res += "/** @gqlEnum */\n";
    //   res += `enum ${key.charAt(0).toUpperCase() + key.slice(1)} {\n`;
    //   value.enumValues.forEach((v) => {
    //     res += `"${v.toUpperCase()}" = "${v}",\n`;
    //   });
    //   res += "}\n\n";
    // }
  });
  return res;
};
fs.writeFileSync("out.ts", g({ accounts: schema.accounts }));
