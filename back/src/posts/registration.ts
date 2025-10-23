import type { Request, Response } from "express";
import database from "../database.ts";

export default function registration(request: Request, _responce: Response) {
  const username = request.body.username;
  const email = request.body.username;
  const password = request.body.password;
  database.query(
    `INSERT INTO users (username, email, password, avatar, info) VALUES ("${username}", "${email}", "${password}", "testoviy", "huihui")`
  );

  database.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.error(err);
    }
    console.log(res);
  });
}
