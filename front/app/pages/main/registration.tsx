import AuthFactory from "../components/authFactory";

export default function Registration() {
  return (
    <AuthFactory
      resources={resources}
      textParagraph="Registration"
      textBtn="Register"
      textA="Do you have an account?"
      action="http://localhost:5000/register"
      href="/login"
    />
  );
}

const resources = [
  {
    id: 0,
    htmlFor: "Username",
    text: "Your Username",
    type: "text",
    name: "username",
    maxLength: 15,
  },
  {
    id: 1,
    htmlFor: "Email",
    text: "Your Email",
    type: "email",
    name: "email",
    maxLength: 50,
  },
  {
    id: 2,
    htmlFor: "Password",
    text: "Your Password",
    type: "password",
    name: "password",
    maxLength: 30,
  },
  {
    id: 3,
    htmlFor: "Return Password",
    text: "Please Return Password",
    type: "password",
    name: "return_password",
    maxLength: 30,
  },
];
