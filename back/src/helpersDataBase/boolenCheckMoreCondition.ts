import database from "../database.ts";

export default async function boolenCheckMoreCondition(
  table: string,
  column: string,
  byColumn: string[],
  value: string[] | number[]
): Promise<any> {
  return new Promise((resolve, reject) => {
    let queryLine = ``;
    byColumn.forEach((value) => {
      queryLine += queryLine == `` ? value + " = ?" : " AND " + value + " = ?";
    });
    database.query(
      `SELECT ${column} FROM ${table} WHERE ${queryLine}`,
      value,
      (err, row: []) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        if (row && row.length != 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    );
  });
}
