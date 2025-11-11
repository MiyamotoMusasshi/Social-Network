import axios from "axios";
import Cookies from "js-cookie";

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
      if (response.data.noerror) {
        Cookies.set("token", response.data.noerror, { expires: 365 });
        Cookies.set("UID", response.data.uid, { expires: 365 });
        document.location.href = "/";
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
