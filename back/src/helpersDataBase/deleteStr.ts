import database from "../database.ts";

export default function deleteStr(table: string, column: string, value: any) {
  database.query(`DELETE FROM ${table} WHERE ${column} = ${value}`);
}
