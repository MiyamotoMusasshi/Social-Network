import database from "../database.ts";

export default async function checkMoreCondition(
  table: string,
  column: string,
  byColumn: string[],
  value: string[] | number[],
  isArray: boolean = false
): Promise<any> {
  return new Promise((resolve, reject) => {
    let queryLine = ``;
    byColumn.forEach((value) => {
      queryLine += queryLine == `` ? value + " = ?" : " AND " + value + " = ?";
    });
    database.query(
      `SELECT ${column} FROM ${table} WHERE ${queryLine}`,
      value,
      (err, row: any[]) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        resolve(!isArray ? row[0] : row);
      }
    );
  });
}
