import axios from "axios";

export function noResponseFetch(
  action: string,
  data: object | FormData,
  isAutoHeaders: boolean
) {
  if (!isAutoHeaders) {
    axios.post(action, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    axios.post(action, data);
  }
}
