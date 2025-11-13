import database from "../database.ts";

export default async function check(
  table: string,
  column: string,
  byColumn: string,
  value: string | number | null
): Promise<any> {
  return new Promise((resolve, reject) => {
    database.query(
      `SELECT ${column} FROM ${table} WHERE ${byColumn} = ?`,
      [value],
      (err, row: []) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        if (row.length != 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    );
  });
}
