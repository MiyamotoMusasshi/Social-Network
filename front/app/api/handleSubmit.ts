import axios from "axios";

export const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  action: string
) => {
  e.preventDefault();

  const formData = new FormData(e.target as HTMLFormElement);
  const sendFormData = JSON.stringify(Object.fromEntries(formData));
  console.log(sendFormData);
  axios
    .post(action, sendFormData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
