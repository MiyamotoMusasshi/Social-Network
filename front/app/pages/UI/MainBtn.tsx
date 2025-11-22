import "app/pages/styles/main-btn.css";

export default function MainBtn({
  textBtn,
  colorBtn,
  onClick,
  isHref,
  href,
}: MainBtnProps) {
  return (
    <button
      className="main"
      style={{ backgroundColor: colorBtn }}
      onClick={onClick}
    >
      {isHref ? <a href={href}>{textBtn}</a> : textBtn}
    </button>
  );
}

type MainBtnProps = {
  textBtn: string;
  colorBtn: string;
  isHref: boolean;
  href: string;
  onClick: () => void;
};
