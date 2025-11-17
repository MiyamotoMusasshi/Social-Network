import "app/pages/styles/chats.css";
import Navigate from "../UI/Navigate";
import { Outlet } from "react-router";

export default function Chats() {
  return (
    <div>
      <Navigate />
      <main className="flex">
        <ul className="w-[25%] p-[10px] border-r border-r-solid border-r-white chats-list h-full">
          <li className="w-[100%] mb-[10px] hover:opacity-[0.7]">
            <div className="flex items-center gap-[15px] cursor-pointer border-b border-b-solid border-b-white justify-center">
              <img
                src="https://png.pngtree.com/thumb_back/fh260/background/20230516/pngtree-avatar-of-a-man-wearing-sunglasses-image_2569096.jpg"
                alt=""
                className="w-[40px] h-[40px] rounded-full border-white border-solid border"
              />
              <div className="flex-col">
                <p className="text-xl">pidor</p>
                <span className="text-gray-600 text-base">
                  Hellow my Friend
                </span>
              </div>
            </div>
          </li>
        </ul>
        <Outlet />
      </main>
    </div>
  );
}
