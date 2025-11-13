import type { Request, Response } from "express";
import editValue from "../helpersDataBase/editValue.ts";

export default function changeProfile(request: Request, responce: Response) {
  const { uid, inChange, value } = request.body;

  editValue("users", inChange, "id", `"${value}"`, Number(uid));
}
