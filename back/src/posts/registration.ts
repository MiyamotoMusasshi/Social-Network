import type { Request, Response } from "express";
import check from "../helpersDataBase/check.ts";
import watch from "../helpersDataBase/watch.ts";
import sendEmailCode from "../helpers/sendEmailCode.ts";
import boolenCheckHash from "../helpersRedis/boolenCheckHash.ts";
import checkHash from "../helpersRedis/checkHash.ts";
import { redisClient } from "../redis.ts";

export default async function registration(
  request: Request,
  responce: Response
) {
  const { username, email, password, return_password, code } = request.body;

  const chekedEmail = await check("users", "email", "email", email);

  const isChekEmailCode = await boolenCheckHash(email);

  if (!isChekEmailCode) {
    if (username.length < 5) {
      responce.json({
        error: "The username must be at least 5 characters long.",
      });
    } else if (chekedEmail == true) {
      responce.json({ error: "Such a user already exists" });
    } else if (password != return_password) {
      responce.json({ error: "Passwords don't match" });
    } else if (password.length < 10) {
      responce.json({
        error: "The password must be at least 10 characters long.",
      });
    } else {
      responce.json({
        register: true,
      });
      let sendedCode = await sendEmailCode(email);
      redisClient.hSet(email, "code", sendedCode);
    }
  } else {
    const codeFromEmail = await checkHash(email);
    console.log(code, codeFromEmail.code);
  }
}
