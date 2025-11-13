export default function ChangingBtn({ onClick }: ChangingBtnProps) {
  return (
    <button
      className="w-[15px] h-[15px] hover:opacity-[0.7] cursor-pointer bg-white rounded-sm"
      onClick={onClick}
    >
      <img src="http://localhost:5000/img/pencil.png" alt="" />
    </button>
  );
}

type ChangingBtnProps = {
  onClick: () => void;
};
