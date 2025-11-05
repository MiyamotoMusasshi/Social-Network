import type { Request, Response } from "express";
import boolenCheck from "../helpersDataBase/boolenCheck.ts";
import watch from "../helpersDataBase/watch.ts";
import check from "../helpersDataBase/check.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.SECRET ?? "";

export default async function authorization(
  request: Request,
  responce: Response
) {
  const { email, password } = request.body;

  const chekedEmail = await boolenCheck("users", "email", "email", email);

  if (chekedEmail != true) {
    responce.json({ error: "There is no such user" });
  } else {
    const passwordFromDataBase = await check(
      "users",
      "password",
      "email",
      email
    );
    const chekedPassword = await bcrypt.compare(
      password,
      passwordFromDataBase.password
    );

    if (chekedPassword != true) {
      responce.json({ error: "Invalid password" });
    } else {
      let UID = await check("users", "id", "email", email);

      let token = jwt.sign({ id: UID.id, email: email }, secret, {
        expiresIn: 31536000,
      });

      responce.json({
        noerror: token,
      });
    }
  }
}
