import "app/pages/styles/main-btn.css";

export default function MainBtn({ textBtn, colorBtn }: MainBtnProps) {
  return (
    <button className={`border-${colorBtn}-600 border-soild border`}>
      {textBtn}
    </button>
  );
}

type MainBtnProps = {
  textBtn: string;
  colorBtn: string;
};
