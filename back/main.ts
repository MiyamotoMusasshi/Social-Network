import dotenv from "dotenv";
import webscoketServer from "./src/websocket.ts";
import httpServer from "./src/httpServer.ts";
import connect from "./src/database.ts";
import post from "./src/post.ts";

dotenv.config();

const PORT = process.env.PORT;

webscoketServer.on("connection", (webscoketMsg) => {
  webscoketMsg.send("connect");
});

httpServer.listen(PORT, () => {
  console.log("http server started");
});
