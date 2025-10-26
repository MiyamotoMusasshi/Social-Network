import type { Request, Response } from "express";
import check from "../helpersDataBase/check.ts";

export default async function registration(
  request: Request,
  _responce: Response
) {
  const username = request.body.username;
  const email = request.body.username;
  const password = request.body.password;
  const returnPassword = request.body.return_password;

  const result = await check("users", "username", "username", username);
  console.log(result);
}
