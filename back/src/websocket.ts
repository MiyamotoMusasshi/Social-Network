import { Server } from "socket.io";
import httpServer from "./httpServer.ts";

const websocketServer = new Server(httpServer);

// websocketServer.on("connection", (websocketMsg) => {
//   websocketMsg.send("connect");
// });

export default websocketServer;
