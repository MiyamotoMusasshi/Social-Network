import type { Request, Response } from "express";
import boolenCheck from "../helpersDataBase/boolenCheck.ts";
import checkMoreCondition from "../helpersDataBase/checkMoreCondition.ts";
import boolenCheckMoreCondition from "../helpersDataBase/boolenCheckMoreCondition.ts";
import check from "../helpersDataBase/check.ts";
import { redisClient } from "../redis.ts";

export default async function chat(request: Request, responce: Response) {
  const { userIdFromUrl, uid } = request.body;

  const isUser = await boolenCheck("users", "id", "id", Number(userIdFromUrl));

  if (isUser) {
    const { avatar, username } = await check(
      "users",
      "avatar,username",
      "id",
      userIdFromUrl
    );

    const isOnline =
      (await redisClient.hGet("users_online", userIdFromUrl)) != null;

    const isMsgs = isUser
      ? await boolenCheckMoreCondition(
          "dialogs",
          "chat_id",
          ["uid1", "uid2"],
          [Number(userIdFromUrl), Number(uid)]
        )
      : false;

    if (isMsgs) {
      const chatId = await checkMoreCondition(
        "dialogs",
        "chat_id",
        ["uid1", "uid2"],
        [Number(userIdFromUrl), Number(uid)]
      );

      const messages = await check(
        "messages_between_users",
        "uid, senderId, message, date",
        "chat_id",
        chatId.chat_id,
        true
      );

      responce.json({
        avatar: avatar,
        username: username,
        isOnline: isOnline,
        messages: messages,
      });
    } else {
      responce.json({
        avatar: avatar,
        username: username,
        isOnline: isOnline,
        messages: [],
      });
    }
  }
}
