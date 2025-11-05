import dotenv from "dotenv";
import websocketServer from "./src/websocket.ts";
import httpServer from "./src/httpServer.ts";
import connection from "./src/database.ts";
import post from "./src/post.ts";
import database from "./src/database.ts";
import { redisClient } from "./src/redis.ts";

dotenv.config();

const PORT = process.env.PORT;

// websocketServer.on("connection", (websocketMsg) => {
//   websocketMsg.send("connect");
// });

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

redisClient.on("error", (err) => console.log("Redis Client Error", err));

await redisClient
  .connect()
  .then(() => {
    console.log("connected Redis");
  })
  .catch((err) => console.log(err));
