import { Server } from "socket.io";
import httpServer from "./httpServer.ts";
import { redisClient } from "./redis.ts";
import push from "./helpersDataBase/push.ts";
import random from "random";
import boolenCheckMoreCondition from "./helpersDataBase/boolenCheckMoreCondition.ts";
import checkMoreCondition from "./helpersDataBase/checkMoreCondition.ts";
import boolenCheck from "./helpersDataBase/boolenCheck.ts";

enum Month {
  "January",
  "February",
  "March",
  "April ",
  "May",
  "June",
  "July ",
  "August ",
  "September",
  "October",
  "November",
  "December",
}

interface date {
  hours: number;
  minutes: number;
  day: number;
  month: number;
  year: number;
}

interface message {
  uidRecipient: string | undefined;
  uidSendler: string | undefined;
  message: string;
  date: date;
  dateForSorting: number;
}

const websocketServer = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

websocketServer.on("connection", async (socketConnected) => {
  socketConnected.on("error", console.error);

  const uid: any = socketConnected.handshake.query.uid;

  redisClient.hSet(
    "users_online",
    uid == undefined ? "" : uid,
    socketConnected.id
  );
  redisClient.hSet(
    "users_online",
    socketConnected.id,
    uid == undefined ? "" : uid
  );

  socketConnected.on("disconnect", () => {
    redisClient.hGet("users_online", socketConnected.id).then((uid) => {
      redisClient.hDel("users_online", uid ?? "");
    });
    redisClient.hDel("users_online", socketConnected.id);
  });

  socketConnected.on("message", async (data: message) => {
    const Recipient = await redisClient.hGet(
      "users_online",
      data.uidRecipient == undefined ? "" : data.uidRecipient
    );
    const Sendler = await redisClient.hGet(
      "users_online",
      data.uidSendler == undefined ? "" : data.uidSendler
    );

    const isRecipientOnline = Recipient != null;
    const isSendlerOnline = Sendler != null;

    const dateMsg = `${data.date.year} ${data.date.day} ${
      Month[data.date.month]
    } ${data.date.hours}.${data.date.minutes}`;

    if (isRecipientOnline) {
      websocketServer
        .to(Recipient)
        .emit("recipient", { message: data.message, date: dateMsg });

      websocketServer
        .to(Recipient)
        .emit("lastMsg", { message: data.message, uid: data.uidRecipient });
    }
    if (isSendlerOnline) {
      websocketServer
        .to(Sendler)
        .emit("sendler", { message: data.message, date: dateMsg });
      websocketServer
        .to(Sendler)
        .emit("lastMsg", { message: data.message, uid: data.uidRecipient });
    }

    const isDialog = await boolenCheckMoreCondition(
      "dialogs",
      "chat_id",
      ["uid1", "uid2"],
      [Number(data.uidRecipient), Number(data.uidSendler)]
    );

    if (!isDialog) {
      let chatId = random.int(0, 999999);
      let chekedChatId = await boolenCheck(
        "dialogs",
        "chat_id",
        "chat_id",
        chatId
      );

      while (chekedChatId) {
        chatId = random.int(0, 999999);
        chekedChatId = await boolenCheck(
          "dialogs",
          "chat_id",
          "chat_id",
          chatId
        );
      }

      push(
        "dialogs",
        ["chat_id", "uid1", "uid2"],
        [chatId, Number(data.uidRecipient), Number(data.uidSendler)]
      );
      push(
        "dialogs",
        ["chat_id", "uid1", "uid2"],
        [chatId, Number(data.uidSendler), Number(data.uidRecipient)]
      );

      push(
        "messages_between_users",
        ["uid", "senderId", "message", "date", "chat_id", "date_for_sorting"],
        [
          Number(data.uidRecipient),
          Number(data.uidSendler),
          data.message,
          dateMsg,
          chatId,
          String(data.dateForSorting),
        ]
      );
    } else {
      const chatId = await checkMoreCondition(
        "dialogs",
        "chat_id",
        ["uid1", "uid2"],
        [Number(data.uidRecipient), Number(data.uidSendler)]
      );

      push(
        "messages_between_users",
        ["uid", "senderId", "message", "date", "chat_id", "date_for_sorting"],
        [
          Number(data.uidRecipient),
          Number(data.uidSendler),
          data.message,
          dateMsg,
          chatId.chat_id,
          String(data.dateForSorting),
        ]
      );
    }
  });
});

export default websocketServer;
