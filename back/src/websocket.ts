import { Server } from "socket.io";
import httpServer from "./httpServer.ts";

const websocketServer = new Server(httpServer);

export default websocketServer;
