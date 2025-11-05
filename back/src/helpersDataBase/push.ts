import database from "../database.ts";

export default function push(table: string, columns: string[], values: any[]) {
  const valuesString = values.map((val) => `'${val}'`).join(", ");
  database.query(
    `INSERT INTO ${table} (${columns.join(",")}) VALUES (${valuesString})`
  );
}
