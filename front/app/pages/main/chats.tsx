import "app/pages/styles/chats.css";
import Navigate from "../UI/Navigate";
import { useCustomFetch } from "~/hooks/useCustomFetch";
import Cookies from "js-cookie";
import { Outlet } from "react-router";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { socket } from "~/helpers/socket";

export default function Chats() {
  const { data, loading } = useCustomFetch("http://localhost:5000/chats", {
    uid: Cookies.get("UID"),
  });

  let navigate = useNavigate();

  const [chats, setChats] = useState<Chats[]>([]);

  useEffect(() => {
    !loading ? setChats(data.chats) : "";
  }, [data]);

  useEffect(() => {
    socket.on("lastMsg", (data) => {
      setChats((prev) => {
        const filteredArray = prev.filter(
          (chat) => chat.uid !== Number(data.uid)
        );

        const updatedChat = prev.find((chat) => chat.uid === Number(data.uid));
        if (updatedChat) {
          const newChat = { ...updatedChat, lastMsg: data.message };

          return [newChat, ...filteredArray];
        }
        return prev;
      });
    });
  }, []);

  return (
    <div>
      <Navigate />
      <main className="flex">
        <ul className="w-[25%] p-[10px] border-r border-r-solid border-r-white chats-list h-full">
          {!loading
            ? chats.map((chat: any, index: any) => (
                <li
                  className="w-[100%] mb-[10px] hover:opacity-[0.7]"
                  key={index}
                  onClick={() => {
                    navigate(`/chats/${chat.uid}`);
                  }}
                >
                  <div className="flex items-center gap-[15px] cursor-pointer border-b border-b-solid border-b-white justify-center">
                    <img
                      src={chat.avatar}
                      alt=""
                      className="w-[40px] h-[40px] rounded-full border-white border-solid border mr-auto"
                    />
                    <div className="flex-col mr-auto w-[40%]">
                      <p className="text-xl">{chat.username}</p>
                      <span
                        className="text-gray-600 text-base"
                        style={{ textWrap: "nowrap" }}
                      >
                        {chat.lastMsg}
                      </span>
                    </div>
                  </div>
                </li>
              ))
            : ""}
        </ul>
        <Outlet />
      </main>
    </div>
  );
}

interface Chats {
  avatar: string;
  lastDate: string;
  lastMsg: string;
  uid: number;
  username: string;
}
