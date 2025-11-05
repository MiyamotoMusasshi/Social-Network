import random from "random";
import boolenCheck from "./boolenCheck.ts";

export default async function generationUID() {
  let UID = random.int(100000, 999999);

  let chekedUID = await boolenCheck("users", "id", "id", UID);

  while (chekedUID == true) {
    UID = random.int(100000, 999999);

    chekedUID = await boolenCheck("users", "id", "id", UID);
  }

  return UID;
}
