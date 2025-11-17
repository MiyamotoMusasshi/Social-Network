import MainBtn from "../UI/MainBtn";

export default function Chat() {
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
      <ul className="p-[30px] msg-list h-[80%]">
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
      </ul>
      <div className="p-[20px] border-t border-t-solid border-t-white flex gap-[20px] justify-center items-center">
        <input
          type="text"
          placeholder="type message"
          className="w-full rounded-full p-[10px] border border-solid border-white"
        />
        <MainBtn textBtn="Send" colorBtn="white" />
      </div>
    </div>
  );
}
