import type { Request, Response } from "express";
import check from "../helpersDataBase/check.ts";
import boolenCheck from "../helpersDataBase/boolenCheck.ts";
import boolenCheckMoreCondition from "../helpersDataBase/boolenCheckMoreCondition.ts";

export default async function loadingProfile(
  request: Request,
  responce: Response
) {
  const UID = request.body.id;
  const user = request.body.user;

  const isUser = await boolenCheck("users", "id", "id", UID);

  if (isUser) {
    const { avatar, username, info, followers, following } = await check(
      "users",
      "avatar,username,info,followers,following",
      "id",
      UID
    );

    const isFollower = await boolenCheckMoreCondition(
      "follow",
      "uidOnFollow",
      ["uidOnFollow", "uidWhoFollow"],
      [UID, user]
    );

    responce.json({
      avatar: avatar,
      username: username,
      info: info,
      followers: followers,
      following: following,
      isFollower: isFollower,
    });
  } else {
    responce.json({ NotUser: true });
  }
}
