import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import check from "../helpersDataBase/check.ts";

dotenv.config();

const secret = process.env.SECRET ?? "";

export default async function checkCookie(
  request: Request,
  responce: Response
) {
  const token = request.body.cookie;
  jwt.verify(token, secret, (err: any, decoded: any) => {
    if (err) {
      console.error(err);
    }
    check("users", "email", "id", decoded.id).then((emailFromDataBase) => {
      responce.json({ verify: emailFromDataBase.email == decoded.email });
    });
  });
}
