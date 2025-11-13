export default function Submit({ textBtn, disabled }: SubmitProps) {
  return (
    <button
      type="submit"
      className="cursor-pointer text-base mt-[10px] w-[10vw]"
      disabled={disabled}
    >
      {disabled ? "Loading..." : textBtn}
    </button>
  );
}

type SubmitProps = {
  textBtn: string;
  disabled: boolean;
};
