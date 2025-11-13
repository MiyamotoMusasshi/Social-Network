import axios from "axios";

export function noResponseFetch(action: string, data: object) {
  axios.post(action, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
