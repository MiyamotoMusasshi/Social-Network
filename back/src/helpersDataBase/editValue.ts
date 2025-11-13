import database from "../database.ts";

export default function editValue(
  table: string,
  column: string,
  byColumn: string,
  newValue: any,
  byColumnValue: any
) {
  database.query(
    `UPDATE ${table} SET ${column} = ${newValue} WHERE ${byColumn} = ${byColumnValue}`,
    (err) => {
      if (err) console.error(err);
    }
  );
}
