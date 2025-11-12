import "app/pages/styles/main-btn.css";

export default function MainBtn({ textBtn, colorBtn }: MainBtnProps) {
  return (
    <button className="main" style={{ backgroundColor: colorBtn }}>
      {textBtn}
    </button>
  );
}

type MainBtnProps = {
  textBtn: string;
  colorBtn: string;
};
