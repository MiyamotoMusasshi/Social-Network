import { Server } from "socket.io";
import httpServer from "./httpServer.ts";
import { redisClient } from "./redis.ts";

interface message {
  uidRecipient: string | undefined;
  uidSendler: string | undefined;
  message: string;
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

    isRecipientOnline
      ? websocketServer.to(Recipient).emit("recipient", { msg: data.message })
      : false;
    isSendlerOnline
      ? websocketServer.to(Sendler).emit("sendler", { msg: data.message })
      : false;
  });
});

export default websocketServer;
