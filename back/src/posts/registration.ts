import type { Request, Response } from "express";
import boolenCheck from "../helpersDataBase/boolenCheck.ts";
import watch from "../helpersDataBase/watch.ts";
import sendEmailCode from "../helpers/sendEmailCode.ts";
import boolenCheckHash from "../helpersRedis/boolenCheckHash.ts";
import checkHash from "../helpersRedis/checkHash.ts";
import { redisClient } from "../redis.ts";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import generationUID from "../helpersDataBase/generationUID.ts";
import push from "../helpersDataBase/push.ts";

dotenv.config();

const secret = process.env.SECRET ?? "";
const salt = bcrypt.genSaltSync(15);

export default async function registration(
  request: Request,
  responce: Response
) {
  const { username, email, password, return_password, code } = request.body;

  const chekedEmail = await boolenCheck("users", "email", "email", email);

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

      redisClient.hSet(email, "code", sendedCode.toString());
    }
  } else {
    const codeFromEmail = await checkHash(email);

    if (codeFromEmail.code == code) {
      let hashPassword = bcrypt.hashSync(password, salt);

      let UID = await generationUID();

      let token = jwt.sign({ id: UID, email: email }, secret, {
        expiresIn: 31536000,
      });

      redisClient.del(email);

      const columns = ["id", "username", "email", "password", "avatar", "info"];

      push("users", columns, [
        UID,
        username,
        email,
        hashPassword,
        "http://localhost:5000/img/avatar.png",
        "your info",
      ]);

      responce.json({
        noerror: token,
      });
    } else {
      responce.json({
        error: "Invalid code",
        register: true,
      });
    }
  }
}
