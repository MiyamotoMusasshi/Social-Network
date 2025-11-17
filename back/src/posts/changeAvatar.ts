import type { Request, Response } from "express";
import editValue from "../helpersDataBase/editValue.ts";
import fs from "fs";
import { uploadFolder } from "../localStorage.ts";
import check from "../helpersDataBase/check.ts";
import path from "path";

export default async function changeAvatar(
  request: Request,
  responce: Response
) {
  const UID = request.file?.originalname
    .replace("avatar", "")
    .replace(".png", "");

  const newAvatar = request.file?.filename;

  const lastAvatar = await check("users", "avatar", "id", Number(UID));

  if (lastAvatar != "http://localhost:5000/img/avatar.png") {
    fs.unlink(
      path.join(uploadFolder, lastAvatar.avatar.substring(26)),
      (err) => {
        console.error(err);
      }
    );
  }

  editValue(
    "users",
    "avatar",
    "id",
    `"http://localhost:5000/img/${newAvatar}"`,
    Number(UID)
  );
}
