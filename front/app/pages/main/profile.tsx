import { useParams } from "react-router";
import Navigate from "../UI/Navigate";
import MainBtn from "../UI/MainBtn";
import MainBtnAlt from "../UI/MainBtnAlt";
import ChangingBtn from "../UI/ChangingBtn";
import Cookies from "js-cookie";
import "app/pages/styles/profile.css";
import { useCustomFetch } from "~/hooks/useCustomFetch";
import Loading from "../UI/Loading";
import { noResponseFetch } from "~/helpers/api/noResponseFetch";
import { useState, useEffect } from "react";
import { editAvatar } from "~/helpers/api/editAvatar";
import { editProfile } from "~/helpers/api/editProfile";

export default function Profile() {
  const { userIdFromUrl } = useParams();

  const [isFollower, setIsFollower] = useState(false);
  const [countFollowers, setCountFollowers] = useState(0);
  const [isEditUsername, setIsEditUsername] = useState(false);
  const [isEditInfo, setIsEditInfo] = useState(false);
  const [username, setUsername] = useState("");
  const [info, setInfo] = useState("");

  const { data, loading } = useCustomFetch(
    "http://localhost:5000/loading-profile",
    {
      id: userIdFromUrl,
      user: Cookies.get("UID"),
    }
  );

  useEffect(() => {
    setIsFollower(data ? data.isFollower : false);
    setCountFollowers(data ? (data.followers == null ? 0 : data.followers) : 0);
    setUsername(data ? data.username : "");
    setInfo(data ? data.info : "");
  }, [data]);

  return (
    <div>
      <Navigate />
      {data && !data.NotUser ? (
        <main>
          <div className="flex p-10 pb-0 flex-col w-full h-full items-center">
            <div className="flex">
              {!loading ? (
                <img
                  src={data != null ? data.avatar : ""}
                  className="w-[100px] h-[100px] rounded-full"
                />
              ) : (
                <Loading />
              )}
              {Cookies.get("UID") == userIdFromUrl ? (
                <ChangingBtn
                  onClick={() => {
                    editAvatar();
                  }}
                />
              ) : null}
            </div>
            <div className="flex p-10  pt-[20px] flex-col w-full h-full items-center">
              <div className="flex gap-[10px] mt-[10px] justify-center">
                {!loading ? (
                  !isEditUsername ? (
                    <p className="texl-2xl">{username}</p>
                  ) : (
                    <input
                      type="text"
                      placeholder="new username"
                      maxLength={50}
                      onKeyDown={(e) => {
                        let resultFunc = editProfile(
                          5,
                          e,
                          "http://localhost:5000/change-profile",
                          "username"
                        );

                        setIsEditUsername(resultFunc.isEdit);
                        setUsername(resultFunc?.value);
                      }}
                    />
                  )
                ) : (
                  <Loading />
                )}
                {Cookies.get("UID") == userIdFromUrl ? (
                  !isEditUsername ? (
                    <ChangingBtn
                      onClick={() => {
                        setIsEditUsername(true);
                      }}
                    />
                  ) : null
                ) : null}
              </div>
              <span className="text-gray-400 text-xs">
                uid: {userIdFromUrl}
              </span>
              <div className="flex gap-[10px] items-center mt-[10px]">
                {!loading ? (
                  !isEditInfo ? (
                    <p className="text-sm">{info}</p>
                  ) : (
                    <input
                      type="text"
                      placeholder="Tell us about yourself"
                      maxLength={200}
                      onKeyDown={(e) => {
                        let resultFunc = editProfile(
                          1,
                          e,
                          "http://localhost:5000/change-profile",
                          "info"
                        );
                        setIsEditInfo(resultFunc.isEdit);
                        setInfo(resultFunc?.value);
                      }}
                    />
                  )
                ) : (
                  <Loading />
                )}
                {Cookies.get("UID") == userIdFromUrl ? (
                  !isEditInfo ? (
                    <ChangingBtn
                      onClick={() => {
                        setIsEditInfo(true);
                      }}
                    />
                  ) : null
                ) : null}
              </div>
              <div className="mt-[10px] flex gap-[20px] items-center jusify-center">
                {!loading ? (
                  <a
                    className="text-sm text-gray-500 cursor-pointer hover:opacity-[0.7]"
                    href={`/followers/${userIdFromUrl}`}
                  >
                    Followers: {" " + countFollowers}
                  </a>
                ) : (
                  <Loading />
                )}
                {!loading ? (
                  <a
                    className="text-sm text-gray-500 cursor-pointer hover:opacity-[0.7]"
                    href={`/following/${userIdFromUrl}`}
                  >
                    Following:{" "}
                    {data && data.following != null
                      ? "" + data.following
                      : " 0"}
                  </a>
                ) : (
                  <Loading />
                )}
              </div>
              <div className="mt-[20px] gap-[10px] flex">
                {Cookies.get("UID") != userIdFromUrl ? (
                  <MainBtnAlt
                    textBtn={isFollower ? "unFollow" : "Follow"}
                    colorBtn="white"
                    onClick={
                      !isFollower
                        ? () => {
                            noResponseFetch(
                              "http://localhost:5000/follow",
                              {
                                forFollow: userIdFromUrl,
                                newFollowers: Cookies.get("UID"),
                              },
                              false
                            );
                            setIsFollower(true);
                            setCountFollowers(countFollowers + 1);
                          }
                        : () => {
                            noResponseFetch(
                              "http://localhost:5000/un-follow",
                              {
                                unFollow: userIdFromUrl,
                                leftFollowers: Cookies.get("UID"),
                              },
                              false
                            );
                            setIsFollower(false);
                            setCountFollowers(countFollowers - 1);
                          }
                    }
                    isHref={false}
                    href=""
                  />
                ) : (
                  <MainBtnAlt
                    textBtn="Leave"
                    colorBtn="red"
                    onClick={() => {
                      Cookies.remove("token");
                      Cookies.remove("UID");
                      window.location.pathname = "/register";
                    }}
                    isHref={false}
                    href=""
                  />
                )}
                {Cookies.get("UID") != userIdFromUrl ? (
                  <MainBtn
                    textBtn="message"
                    colorBtn="white"
                    isHref={true}
                    href={`/chats/${userIdFromUrl}`}
                    onClick={() => {}}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </main>
      ) : (
        <main className="flex justify-center">
          <h1 className="text-6xl">There is no such user</h1>
        </main>
      )}
    </div>
  );
}
