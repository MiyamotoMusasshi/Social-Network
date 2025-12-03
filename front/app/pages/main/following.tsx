import { useParams } from "react-router";
import MainBtn from "../UI/MainBtn";
import MainBtnAlt from "../UI/MainBtnAlt";
import { useCustomFetch } from "~/hooks/useCustomFetch";
import type { follow } from "../components/followLayout";
import { useState, useEffect } from "react";
import { noResponseFetch } from "~/helpers/api/noResponseFetch";
import Cookies from "js-cookie";

export default function Following() {
  const { userIdFromUrl } = useParams();

  const { data, loading } = useCustomFetch(
    "http://localhost:5000/loading-follows",
    { uid: userIdFromUrl, from: "uidWhoFollow", who: "uidOnFollow" }
  );

  const [following, setFollowing] = useState<follow[]>([]);

  useEffect(() => {
    !loading ? setFollowing(data.followsList) : "";
  }, [data]);

  return (
    <ul className="follow-list w-full p-[10px] border-r border-r-solid border-r-white chats-list h-full ">
      {!loading
        ? following.map((follow: follow, index) => (
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
                {Cookies.get("UID") == userIdFromUrl ? (
                  <MainBtnAlt
                    textBtn="unFollow"
                    colorBtn="white"
                    onClick={() => {
                      noResponseFetch(
                        "http://localhost:5000/un-follow",
                        {
                          unFollow: String(follow.uid),
                          leftFollowers: Cookies.get("UID"),
                        },
                        false
                      );
                    }}
                    isHref={false}
                    href=""
                  />
                ) : (
                  ""
                )}
              </div>
            </li>
          ))
        : ""}
    </ul>
  );
}
