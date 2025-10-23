import Submit from "../UI/Submit";
import { handleSubmit } from "~/api/handleSubmit";
import { useFetcher } from "react-router";

export default function AuthFactory({
  resources,
  textParagraph,
  textBtn,
  textA,
  action,
}: AuthFactoryProps) {
  let fetcher = useFetcher();
  return (
    <fetcher.Form
      className="w-ful"
      onSubmit={(e) => {
        handleSubmit(e, action);
      }}
    >
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
              <input type={type} placeholder={placeholder} name={placeholder} />
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
  action: string;
};
