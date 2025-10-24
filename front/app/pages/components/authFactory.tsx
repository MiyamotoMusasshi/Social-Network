import Submit from "../UI/Submit";
import { handleSubmit } from "~/api/handleSubmit";
import { useFetcher } from "react-router";
import { useState } from "react";
import type { AuthFactoryProps } from "../props/AuthFactoryProps";

export default function AuthFactory({
  resources,
  textParagraph,
  textBtn,
  textA,
  action,
}: AuthFactoryProps) {
  let fetcher = useFetcher();
  const [countSymbol, setCountSymbol] = useState<number[]>(
    new Array(resources.length).fill(0)
  );
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
        handleSubmit(e, action);
      }}
    >
      <div className="flex p-10 flex-col w-full h-full">
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
              <span className="text-xs ml-auto mt-px">
                {countSymbol[id]}/{maxLength}
              </span>
            </label>
          ))}
          <Submit textBtn={textBtn} />
          <a href="" className="mx-auto mt-[10px] text-sm">
            {textA}
          </a>
        </div>
      </div>
    </fetcher.Form>
  );
}
