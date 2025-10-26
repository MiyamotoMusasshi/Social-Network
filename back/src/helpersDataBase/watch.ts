import database from "../database.ts";

export default function watch(table: string): Promise<any> {
  return new Promise((resolve, reject) => {
    database.query(`SELECT * FROM ${table}`, (err, result) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      resolve(result);
    });
  });
}
