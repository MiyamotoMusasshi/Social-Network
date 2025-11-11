import "app/pages/styles/main-btn.css";

export default function MainBtn({ textBtn }: MainBtnProps) {
  return <button className="alt">{textBtn}</button>;
}

type MainBtnProps = {
  textBtn: string;
};
