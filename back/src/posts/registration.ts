import type { Request, Response } from "express";
import check from "../helpersDataBase/check.ts";
import watch from "../helpersDataBase/watch.ts";

export default async function registration(
  request: Request,
  responce: Response
) {
  const username = request.body.username;
  const email = request.body.username;
  const password = request.body.password;
  const returnPassword = request.body.return_password;

  const chekedEmail = await check("users", "email", "email", email);

  if (username.length < 5) {
    responce.json({
      error: "The username must be at least 5 characters long.",
    });
  } else if (chekedEmail == true) {
    responce.json({ error: "Such a user already exists" });
  } else if (password != returnPassword) {
    responce.json({ error: "Passwords don't match" });
  } else if (password.length < 10) {
    responce.json({
      error: "The password must be at least 10 characters long.",
    });
  } else {
    responce.json({
      noerror: "",
    });
  }
}
