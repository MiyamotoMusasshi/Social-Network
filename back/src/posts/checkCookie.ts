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

  if (token == undefined) {
    responce.json({ verify: false });
  } else {
    jwt.verify(token, secret, (err: any, decoded: any) => {
      if (err) {
        console.error(err);
      }
      check("users", "email", "id", decoded.id).then((emailFromDataBase) => {
        responce.json({
          verify: emailFromDataBase
            ? emailFromDataBase.email == decoded.email
            : false,
        });
      });
    });
  }
}
