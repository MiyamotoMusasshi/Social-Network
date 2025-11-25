import type { Request, Response } from "express";
import check from "../helpersDataBase/check.ts";
import checkMoreCondition from "../helpersDataBase/checkMoreCondition.ts";

export default async function chats(request: Request, responce: Response) {
  const { uid } = request.body;

  const chatsWith = await check("dialogs", "uid2", "uid1", Number(uid), true);

  const chatsPromises = chatsWith.map(async (chatWith: any) => {
    const chatId = await checkMoreCondition(
      "dialogs",
      "chat_id",
      ["uid1", "uid2"],
      [Number(chatWith.uid2), Number(uid)]
    );

    const messages = await check(
      "messages_between_users",
      "message, date_for_sorting",
      "chat_id",
      chatId.chat_id,
      true
    );

    const lastDate = messages[messages.length - 1].date_for_sorting;

    const lastMsg = messages[messages.length - 1].message;
    const user = await check(
      "users",
      "avatar, username",
      "id",
      Number(chatWith.uid2)
    );

    return {
      lastMsg: lastMsg,
      username: user.username,
      avatar: user.avatar,
      uid: chatWith.uid2,
      lastDate: lastDate,
    };
  });

  const chats = await Promise.all(chatsPromises);

  chats.sort((a: any, b: any) => {
    return Number(b.lastDate) - Number(a.lastDate);
  });

  responce.json({
    chats: chats,
  });
}
