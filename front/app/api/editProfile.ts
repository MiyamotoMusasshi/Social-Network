import { noResponseFetch } from "./noResponseFetch";
import Cookies from "js-cookie";

export function editProfile(
  minLen: number,
  e: any,
  url: string,
  inChange: string
) {
  if (e.target.value.length > minLen && e.key == "Enter") {
    noResponseFetch(
      url,
      { uid: Cookies.get("UID"), inChange: inChange, value: e.target.value },
      false
    );
    return { value: e.target.value, isEdit: false };
  }
  return { isEdit: true };
}
