import "app/pages/styles/main-btn.css";

export default function MainBtn({ textBtn, colorBtn, onClick }: MainBtnProps) {
  return (
    <button
      className="border-soild border alt"
      style={{ borderColor: colorBtn }}
      onClick={onClick}
    >
      {textBtn}
    </button>
  );
}

type MainBtnProps = {
  textBtn: string;
  colorBtn: string;
  onClick: () => void;
};
