import { noResponseFetch } from "./noResponseFetch";
import Cookies from "js-cookie";

export function editAvatar() {
  const fileInput = document.createElement("input");

  fileInput.type = "file";
  fileInput.name = "avatar";

  fileInput.addEventListener("change", (e: any) => {
    const fileAvatar: Blob = e.target.files[0];

    if (fileAvatar) {
      const formData = new FormData();

      formData.append("avatar", fileAvatar, `avatar${Cookies.get("UID")}.png`);

      noResponseFetch("http://localhost:5000/change-avatar", formData, true);
    }
  });

  fileInput.click();
  fileInput.remove();
}
