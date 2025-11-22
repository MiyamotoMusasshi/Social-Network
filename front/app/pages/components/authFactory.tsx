import Submit from "../UI/Submit";
import { handleSubmit } from "~/helpers/api/handleSubmit";
import { useFetcher } from "react-router";
import { Activity, useState } from "react";
import type { AuthFactoryProps } from "../props/AuthFactoryProps";
import ConfirmEmailCode from "../UI/ConfirmEmailCode";
import Loading from "../UI/Loading";

export default function AuthFactory({
  resources,
  textParagraph,
  textBtn,
  textA,
  action,
  href,
}: AuthFactoryProps) {
  let fetcher = useFetcher();
  const [countSymbol, setCountSymbol] = useState<number[]>(
    new Array(resources.length).fill(0)
  );
  const [serverData, setServerData] = useState();
  const [disabled, setDisabled] = useState(false);
  const [isConfirmCode, setIsConfirmCode] = useState(false);
  const updateCount = (index: number, newValue: number) => {
    setCountSymbol((prev) => {
      const cloneArray = [...prev];
      cloneArray[index] = newValue;
      return cloneArray;
    });
  };
  return (
    <fetcher.Form
      className="w-ful"
      onSubmit={(e) => {
        handleSubmit(
          e,
          action,
          (data) => {
            setServerData(data);
          },
          (isDisabled) => {
            setDisabled(isDisabled);
          },
          (isConfirmCode) => {
            setIsConfirmCode(isConfirmCode);
          }
        );
      }}
    >
      <div className="flex p-10 flex-col w-full h-full">
        <Activity mode={isConfirmCode ? "hidden" : "visible"}>
          <p className="text-4xl mb-[20px] mx-auto">{textParagraph}</p>
          <div className="flex flex-col mx-auto">
            {resources.map(({ id, htmlFor, text, type, name, maxLength }) => (
              <label
                htmlFor={htmlFor}
                key={id}
                className="flex flex-col mb-[10px]"
              >
                <span className="text-xl">{text}</span>
                <input
                  type={type}
                  placeholder={name}
                  name={name}
                  onChange={(e) => {
                    updateCount(id, e.target.value.length);
                  }}
                  maxLength={maxLength}
                />
                <span className="">
                  {countSymbol[id]}/{maxLength}
                </span>
              </label>
            ))}
            <div className="flex justify-center items-center w-full">
              {!disabled ? (
                <Submit textBtn={textBtn} disabled={disabled} />
              ) : (
                <Loading />
              )}
            </div>
            <a href={href} className="mx-auto mt-[10px] text-sm">
              {textA}
            </a>
          </div>
        </Activity>
        <ConfirmEmailCode
          isConfirmCode={isConfirmCode}
          disabledBtn={disabled}
        />
        <p className="mx-auto text-lg mt-[10px] text-red-600">{serverData}</p>
      </div>
    </fetcher.Form>
  );
}
