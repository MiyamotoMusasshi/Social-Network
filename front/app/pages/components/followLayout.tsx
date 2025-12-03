import Navigate from "../UI/Navigate";
import { Outlet } from "react-router";
import "../styles/follow.css";

export default function Follows() {
  return (
    <div>
      <Navigate />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export interface follow {
  avatar: string;
  username: string;
  uid: number;
}
