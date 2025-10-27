import axios from "axios";

export const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  action: string,
  returnData: (data: any) => void,
  disabledButton: (isDisabled: any) => void,
  activityConfirmEmailCode: (isConfirmCode: any) => void
) => {
  e.preventDefault();

  const formData = new FormData(e.target as HTMLFormElement);
  const sendFormData = JSON.stringify(Object.fromEntries(formData));

  disabledButton(true);
  axios
    .post(action, sendFormData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      returnData(response.data.error ? response.data.error : "");
      disabledButton(false);
      activityConfirmEmailCode(response.data.register);
    })
    .catch((error) => {
      console.log(error);
    });
};
