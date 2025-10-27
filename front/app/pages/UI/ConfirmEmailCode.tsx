import Submit from "./Submit";
import { Activity } from "react";

export default function ConfirmEmailCode({
  isConfirmCode,
  disabledBtn,
}: ConfirmEmailCodeProps) {
  return (
    <Activity mode={isConfirmCode ? "visible" : "hidden"}>
      <label
        htmlFor="confirmation"
        key="166161"
        className="flex flex-col mb-[10px]"
      >
        <span className="text-xs ml-auto mt-px">
          Please enter the code from the message.
        </span>
        <input type="text" name="code" placeholder="Code" />
      </label>
      <Submit textBtn="Enter Code" disabled={disabledBtn} />
    </Activity>
  );
}

type ConfirmEmailCodeProps = {
  isConfirmCode: boolean;
  disabledBtn: boolean;
};
