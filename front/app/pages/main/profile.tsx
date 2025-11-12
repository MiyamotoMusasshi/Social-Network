import { useParams } from "react-router";
import Navigate from "../UI/Navigate";
import MainBtn from "../UI/MainBtn";
import MainBtnAlt from "../UI/MainBtnAlt";
import ChangingBtn from "../UI/ChangingBtn";
import Cookies from "js-cookie";
import "app/pages/styles/profile.css";
import { useCustomFetch } from "~/hooks/useCustomFetch";
import Loading from "../UI/Loading";

export default function Profile() {
  const { userIdFromUrl } = useParams();
  const { data, loading } = useCustomFetch(
    "http://localhost:5000/loading-profile",
    {
      id: userIdFromUrl,
    }
  );

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
              {Cookies.get("UID") == userIdFromUrl ? <ChangingBtn /> : null}
            </div>
            <div className="flex p-10  pt-[20px] flex-col w-full h-full items-center">
              <div className="flex gap-[10px] mt-[10px] justify-center">
                {!loading ? (
                  <p className="texl-2xl">
                    {data != null ? data.username : ""}
                  </p>
                ) : (
                  <Loading />
                )}
                {Cookies.get("UID") == userIdFromUrl ? <ChangingBtn /> : null}
              </div>
              <span className="text-gray-400 text-xs">
                uid: {userIdFromUrl}
              </span>
              <div className="flex gap-[10px] items-center mt-[10px]">
                {!loading ? (
                  <p className="text-sm">{data != null ? data.info : ""}</p>
                ) : (
                  <Loading />
                )}
                {Cookies.get("UID") == userIdFromUrl ? <ChangingBtn /> : null}
              </div>
              <div className="mt-[10px] flex gap-[20px] items-center jusify-center">
                {!loading ? (
                  <a className="text-sm text-gray-500 cursor-pointer hover:opacity-[0.7]">
                    Followers:
                    {data && data.followers != null
                      ? "" + data.followers
                      : " 0"}
                  </a>
                ) : (
                  <Loading />
                )}
                {!loading ? (
                  <a className="text-sm text-gray-500 cursor-pointer hover:opacity-[0.7]">
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
                    textBtn="Follow"
                    colorBtn="white"
                    onClick={() => {}}
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
                  />
                )}
                {Cookies.get("UID") != userIdFromUrl ? (
                  <MainBtn textBtn="message" colorBtn="white" />
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
