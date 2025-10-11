export default function Registration() {
  return (
    <form className="w-ful">
      <div className="flex p-10 flex-col w-full h-full">
        <p className="text-4xl mb-[40px] mx-auto">Registration</p>
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
            Register
          </button>
          <a href="" className="mx-auto mt-[10px] text-sm">
            no account?
          </a>
        </div>
      </div>
    </form>
  );
}

const resources = [
  {
    id: 0,
    htmlFor: "Username",
    text: "Your Username",
    type: "text",
    placeholder: "username",
  },
  {
    id: 1,
    htmlFor: "Email",
    text: "Your Email",
    type: "email",
    placeholder: "email",
  },
  {
    id: 2,
    htmlFor: "Password",
    text: "Your Password",
    type: "password",
    placeholder: "password",
  },
  {
    id: 3,
    htmlFor: "Return Password",
    text: "Please Return Password",
    type: "password",
    placeholder: "return password",
  },
];
