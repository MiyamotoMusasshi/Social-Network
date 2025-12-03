import type { Request, Response } from "express";
import check from "../helpersDataBase/check.ts";
import boolenCheck from "../helpersDataBase/boolenCheck.ts";

export default async function loadingFollows(
  request: Request,
  responce: Response
) {
  const { uid, from, who } = request.body;
  const isUser = await boolenCheck("users", "id", "id", uid);

  if (isUser) {
    const arrayInfo = await check("follow", who, from, Number(uid), true);

    const followsPromise = arrayInfo.map(async (follow: any) => {
      const username = await check(
        "users",
        "username",
        "id",
        Number(follow.uidWhoFollow ? follow.uidWhoFollow : follow.uidOnFollow)
      );
      const avatar = await check(
        "users",
        "avatar",
        "id",
        Number(follow.uidWhoFollow ? follow.uidWhoFollow : follow.uidOnFollow)
      );

      const uid = await check(
        "users",
        "id",
        "id",
        Number(follow.uidWhoFollow ? follow.uidWhoFollow : follow.uidOnFollow)
      );

      return {
        username: username.username,
        avatar: avatar.avatar,
        uid: uid.id,
      };
    });

    const follows = await Promise.all(followsPromise);

    responce.json({ followsList: follows });
  }
}
