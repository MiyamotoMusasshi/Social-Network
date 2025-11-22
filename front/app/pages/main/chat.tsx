import MainBtn from "../UI/MainBtn";
import message from "~/helpers/message";
import { data, useParams } from "react-router";
import Cookies from "js-cookie";
import { socket } from "~/helpers/socket";
import { useEffect, useState } from "react";

export default function Chat() {
  const { userIdFromUrl } = useParams();

  const [newMessageInterlocutor, setNewMessageInterlocutor] = useState<
    string[]
  >([]);
  const [newMyMessage, setNewMyMessage] = useState<string[]>([]);

  useEffect(() => {
    socket.on("recipient", (data) => {
      setNewMessageInterlocutor((prev) => {
        const cloneArray = [...prev];
        cloneArray.push(data.msg);
        return cloneArray;
      });
    });
  }, [data]);

  useEffect(() => {
    socket.on("sendler", (data) => {
      setNewMyMessage((prev) => {
        const cloneArray = [...prev];
        cloneArray.push(data.msg);
        return cloneArray;
      });
    });
  }, [data]);
  return (
    <div className="w-[75%]">
      <div className="flex gap-[20px] justify-center items-center w-full border-b border-b-solid border-b-white h-[70px] cursor-pointer hover:opacity-[0.7]">
        <div className="flex">
          <img
            src="https://png.pngtree.com/thumb_back/fh260/background/20230516/pngtree-avatar-of-a-man-wearing-sunglasses-image_2569096.jpg"
            alt=""
            className="w-[50px] h-[50px] rounded-full border-white border-solid border"
          />
          <div
            className="rounded-full w-[10px] h-[10px] mt-auto"
            style={{ backgroundColor: "red" }}
          ></div>
        </div>
        <p className="text-3xl">pidor</p>
      </div>
      <ul className="p-[30px] msg-list h-[80%]" id="msg-list">
        <li className="flex mb-[20px]">
          <div className="border border-solid border-white rounded-4xl p-[10px] bg-white">
            <span className="text-black">hello drughello drughello drug</span>
          </div>
        </li>
        <li className="flex mb-[20px]">
          <div className="border border-solid border-white rounded-4xl p-[10px] ml-auto">
            <span>hello drughello drughello drug</span>
          </div>
        </li>
        {newMessageInterlocutor.length != 0
          ? newMessageInterlocutor.map((msg, index) => (
              <li className="flex mb-[20px]" key={index}>
                <div className="border border-solid border-white rounded-4xl p-[10px] bg-white">
                  <span className="text-black">{msg}</span>
                </div>
              </li>
            ))
          : ""}
        {newMyMessage.length != 0
          ? newMyMessage.map((msg, index) => (
              <li className="flex mb-[20px]" key={index}>
                <div className="border border-solid border-white rounded-4xl p-[10px] ml-auto">
                  <span>{msg}</span>
                </div>
              </li>
            ))
          : ""}
      </ul>
      <div className="p-[20px] border-t border-t-solid border-t-white flex gap-[20px] justify-center items-center">
        <input
          type="text"
          placeholder="type message"
          className="w-full rounded-full p-[10px] border border-solid border-white"
          id="typed-message"
          onKeyDown={(e) => {
            e.key == "Enter" ? message(userIdFromUrl, Cookies.get("UID")) : "";
          }}
        />
        <MainBtn
          textBtn="Send"
          colorBtn="white"
          isHref={false}
          href=""
          onClick={() => {
            message(userIdFromUrl, Cookies.get("UID"));
          }}
        />
      </div>
    </div>
  );
}
