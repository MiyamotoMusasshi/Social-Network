import { io } from "socket.io-client";
import Cookies from "js-cookie";

export const socket = io("http://localhost:5000", {
  query: {
    uid: Cookies.get("UID") ? Cookies.get("UID") : "",
  },
});
