import { Outlet } from "react-router";
import "../styles/auth.css";

export default function Auth() {
  return (
    <main>
      <form>
        <Outlet />
      </form>
    </main>
  );
}
