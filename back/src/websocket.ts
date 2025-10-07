import { Server } from "socket.io";
import httpServer from "./httpServer.ts";

const webscoketServer = new Server(httpServer);

export default webscoketServer;
