import AuthFactory from "../components/authFactory";

export default function Registration() {
  return (
    <AuthFactory
      resources={resources}
      textParagraph="Registration"
      textBtn="Register"
      textA="no account?"
      action="http://localhost:5000/register"
    />
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
    placeholder: "return_password",
  },
];
