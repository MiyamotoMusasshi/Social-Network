import type { Request, Response } from "express";
import check from "../helpersDataBase/check.ts";
import watch from "../helpersDataBase/watch.ts";

export default async function authorization(
  request: Request,
  responce: Response
) {
  const email = request.body.username;
  const password = request.body.password;

  const chekedEmail = await check("users", "email", "email", email);
  const chekedPassword = await check("users", "password", "email", password);

  if (chekedEmail != true) {
    responce.json({ error: "There is no such user" });
  } else if (chekedPassword != true) {
    responce.json({ error: "Invalid password" });
  } else {
    responce.json({
      noerror: true,
    });
  }
}
