import "app/pages/styles/main-btn.css";

export default function MainBtnALt({
  textBtn,
  colorBtn,
  onClick,
  isHref,
  href,
}: MainBtnProps) {
  return (
    <button
      className="border-soild border alt"
      type="button"
      style={{ borderColor: colorBtn }}
      onClick={onClick}
    >
      {isHref ? <a href={href}>{textBtn}</a> : textBtn}
    </button>
  );
}

type MainBtnProps = {
  textBtn: string;
  colorBtn: string;
  onClick: () => void;
  isHref: boolean;
  href: string;
};
