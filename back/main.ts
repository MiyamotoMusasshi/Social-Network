import dotenv from "dotenv";
import webscoketServer from "./src/websocket.ts";
import httpServer from "./src/httpServer.ts";
import connection from "./src/database.ts";
import post from "./src/post.ts";
import database from "./src/database.ts";

dotenv.config();

const PORT = process.env.PORT;

webscoketServer.on("connection", (webscoketMsg) => {
  webscoketMsg.send("connect");
});

httpServer.listen(PORT, () => {
  console.log("http server started");
});

database.connect((err) => {
  if (err) {
    console.error("Ошибка подключения:", err);
  } else {
    console.log("Подключено к MySQL!");
  }
});
