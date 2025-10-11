import React from "react";

export default function AuthFactory({
  resources,
  textParagraph,
  textBtn,
  textA,
}: AuthFactoryProps) {
  return (
    <form className="w-ful">
      <div className="flex p-10 flex-col w-full h-full">
        <p className="text-4xl mb-[40px] mx-auto">{textParagraph}</p>
        <div className="flex flex-col mx-auto">
          {resources.map(({ id, htmlFor, text, type, placeholder }) => (
            <label
              htmlFor={htmlFor}
              key={id}
              className="flex flex-col mb-[10px]"
            >
              <span className="text-xl">{text}</span>
              <input type={type} placeholder={placeholder} />
            </label>
          ))}
          <button className="cursor-pointer text-base mt-[10px]">
            {textBtn}
          </button>
          <a href="" className="mx-auto mt-[10px] text-sm">
            {textA}
          </a>
        </div>
      </div>
    </form>
  );
}

type Resource = {
  id: number;
  htmlFor: string;
  text: string;
  type: string;
  placeholder: string;
};

type AuthFactoryProps = {
  resources: Resource[];
  textParagraph: string;
  textBtn: string;
  textA: string;
};
