import { useFormStatus } from "react-dom";

export default function Submit({ textBtn }: SubmitProps) {
  const { pending } = useFormStatus();
  console.log(pending);
  return (
    <button
      type="submit"
      className="cursor-pointer text-base mt-[10px]"
      disabled={pending}
    >
      {pending ? "Loading..." : textBtn}
    </button>
  );
}

type SubmitProps = {
  textBtn: string;
};
