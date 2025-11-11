import { useParams } from "react-router";
import Navigate from "../UI/Navigate";
import MainBtn from "../UI/MainBtn";
import MainBtnAlt from "../UI/MainBtnAlt";
import "app/pages/styles/profile.css";

export default function Profile() {
  const { userId } = useParams();
  return (
    <div>
      <Navigate />
      <main>
        <div className="flex p-10 flex-col w-full h-full items-center">
          <img
            src="https://avatars.mds.yandex.net/i?id=a435236fa11d672a2ddd648a9b6389397ee24442-16292262-images-thumbs&n=13"
            className="w-[100px] h-[100px] rounded-full"
          />
          <div className="flex p-10 flex-col w-full h-full items-center">
            <p className="texl-2xl">ZorroZoruch</p>
            <span className="text-gray-400 text-xs">uid: 812928318</span>
            <p className="text-sm">
              Is Here Is Here Is Here Is Here Is Here Is Here Is Here Is
              Here{" "}
            </p>
            <div className="mt-[20px] flex gap-[20px] items-center jusify-center">
              <p className="text-sm text-gray-500">Followers: 21k</p>
              <p className="text-sm text-gray-500">Following: 21k</p>
            </div>
            <div className="mt-[20px] gap-[10px] flex">
              <MainBtnAlt textBtn="Follow" />
              <MainBtn textBtn="message" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
