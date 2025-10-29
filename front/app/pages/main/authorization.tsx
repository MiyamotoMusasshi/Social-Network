import AuthFactory from "../components/authFactory";

export default function Registration() {
  return (
    <AuthFactory
      resources={resources}
      textParagraph="Authorization"
      textBtn="Log in"
      textA="no account?"
      action="http://localhost:5000/login"
      href="/register"
    />
  );
}

const resources = [
  {
    id: 0,
    htmlFor: "Email",
    text: "Your Email",
    type: "email",
    name: "email",
    maxLength: 50,
  },
  {
    id: 1,
    htmlFor: "Password",
    text: "Your Password",
    type: "password",
    name: "password",
    maxLength: 30,
  },
];
