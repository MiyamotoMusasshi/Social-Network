import MainBtn from "../UI/MainBtn";
import message from "~/helpers/message";
import { data, useParams } from "react-router";
import Cookies from "js-cookie";
import { socket } from "~/helpers/socket";
import { useEffect, useState, useRef } from "react";
import { useCustomFetch } from "~/hooks/useCustomFetch";
import Loading from "../UI/Loading";

export default function Chat() {
  const { userIdFromUrl } = useParams();

  const messagesEndRef = useRef<any>(null);

  const { data, loading } = useCustomFetch(
    "http://localhost:5000/chat",
    {
      userIdFromUrl: userIdFromUrl,
      uid: Cookies.get("UID"),
    },
    userIdFromUrl
  );

  const [newMessageInterlocutor, setNewMessageInterlocutor] = useState<
    messageFromServer[]
  >([]);
  const [newMyMessage, setNewMyMessage] = useState<messageFromServer[]>([]);

  useEffect(() => {
    setNewMessageInterlocutor([]);
    setNewMyMessage([]);
  }, [userIdFromUrl]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [data, newMessageInterlocutor, newMyMessage]);

  useEffect(() => {
    socket.on("recipient", (data) => {
      setNewMessageInterlocutor((prev) => {
        const cloneArray = [...prev];
        cloneArray.push(data);
        return cloneArray;
      });
    });

    socket.on("sendler", (data) => {
      setNewMyMessage((prev) => {
        const cloneArray = [...prev];
        cloneArray.push(data);
        return cloneArray;
      });
    });
  }, []);

  if (userIdFromUrl == Cookies.get("UID")) {
    window.location.href = "/chats";
  }

  return (
    <div className="w-[75%]">
      <div
        className="flex gap-[20px] justify-center items-center w-full border-b border-b-solid border-b-white h-[70px] cursor-pointer hover:opacity-[0.7]"
        onClick={() => {
          window.location.href = "/profile/" + userIdFromUrl;
        }}
      >
        <div className="flex">
          <img
            src={loading ? "http://localhost:5000/img/avatar.png" : data.avatar}
            alt=""
            className="w-[50px] h-[50px] rounded-full border-white border-solid border"
          />
          <div
            className="rounded-full w-[10px] h-[10px] mt-auto"
            style={{
              backgroundColor: loading || data?.isOnline ? "green" : "red",
            }}
          ></div>
        </div>
        {!loading ? <p className="text-3xl">{data.username}</p> : <Loading />}
      </div>
      <ul className="p-[30px] msg-list h-[80%]" id="msg-list">
        {!loading
          ? data.messages
            ? data.messages.map((msg: any, index: any) =>
                msg.uid != userIdFromUrl ? (
                  <li
                    className="flex mb-[20px] flex-col items-start"
                    key={index}
                  >
                    <div
                      className="border border-solid border-white rounded-4xl p-[10px] bg-white max-w-[100%]"
                      style={{ wordWrap: "break-word" }}
                    >
                      <span className="text-black">{msg.message}</span>
                    </div>
                    <p className="pl-[12px] text-sm text-gray-400 mt-[5px]">
                      {msg.date}
                    </p>
                  </li>
                ) : (
                  <li className="flex mb-[20px] flex-col" key={index}>
                    <div
                      className="border border-solid border-white rounded-4xl p-[10px] ml-auto max-w-[100%]"
                      style={{ wordWrap: "break-word" }}
                    >
                      <span>{msg.message}</span>
                    </div>
                    <p className="pr-[12px] text-sm text-gray-400 mt-[5px] ml-auto">
                      {msg.date}
                    </p>
                  </li>
                )
              )
            : ""
          : ""}
        {newMessageInterlocutor.length != 0
          ? newMessageInterlocutor.map((msg, index) => (
              <li className="flex mb-[20px] flex-col items-start" key={index}>
                <div
                  className="border border-solid border-white rounded-4xl p-[10px] bg-white max-w-[100%]"
                  style={{ wordWrap: "break-word" }}
                >
                  <span className="text-black">{msg.message}</span>
                </div>
                <p className="pl-[12px] text-sm text-gray-400 mt-[5px]">
                  {msg.date}
                </p>
              </li>
            ))
          : ""}
        {newMyMessage.length != 0
          ? newMyMessage.map((msg, index) => (
              <li className="flex mb-[20px] flex-col" key={index}>
                <div
                  className="border border-solid border-white rounded-4xl p-[10px] ml-auto max-w-[100%]"
                  style={{ wordWrap: "break-word" }}
                >
                  <span>{msg.message}</span>
                </div>
                <p className="pr-[12px] text-sm text-gray-400 mt-[5px] ml-auto">
                  {msg.date}
                </p>
              </li>
            ))
          : ""}
        <div ref={messagesEndRef}></div>
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

interface messageFromServer {
  message: string;
  date: string;
}

interface messages extends messageFromServer {
  uid: string;
  senderId: string;
}
