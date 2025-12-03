import { useParams } from "react-router";
import MainBtn from "../UI/MainBtn";
import MainBtnAlt from "../UI/MainBtnAlt";
import { useCustomFetch } from "~/hooks/useCustomFetch";
import { useState, useEffect } from "react";
import type { follow } from "../components/followLayout";

export default function Followers() {
  const { userIdFromUrl } = useParams();

  const { data, loading } = useCustomFetch(
    "http://localhost:5000/loading-follows",
    { uid: userIdFromUrl, from: "uidOnFollow", who: "uidWhoFollow" }
  );

  const [followers, setFollowers] = useState<follow[]>([]);

  useEffect(() => {
    !loading ? setFollowers(data.followsList) : "";
  }, [data]);

  console.log(followers);
  return (
    <ul className="follow-list w-full p-[10px] border-r border-r-solid border-r-white chats-list h-full ">
      {!loading
        ? followers.map((follow: follow, index) => (
            <li className="w-[100%] mb-[10px] cursor-default" key={index}>
              <div className="flex items-center gap-[15px] border border-solid border-white justify-center rounded-full pr-[5px]">
                <img
                  src={follow.avatar}
                  className="w-[40px] h-[40px] rounded-full border-white border-solid border"
                />
                <p
                  className="mr-auto cursor-pointer hover:opacity-[0.7]"
                  onClick={() => {
                    window.location.href = "/profile/" + String(follow.uid);
                  }}
                >
                  {follow.username}
                </p>
                <MainBtn
                  textBtn="message"
                  colorBtn="white"
                  onClick={() => {}}
                  isHref={true}
                  href={`/chats/${String(follow.uid)}`}
                />
              </div>
            </li>
          ))
        : ""}
    </ul>
  );
}
