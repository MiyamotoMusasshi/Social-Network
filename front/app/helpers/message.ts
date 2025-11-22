import { socket } from "app/helpers/socket";

export default function message(
  uidRecipient: string | undefined,
  uidSendler: string | undefined
) {
  const typedMessage: any = document.querySelector("#typed-message");
  const msgList = document.querySelector("#msg-list");

  if (typedMessage.value != "") {
    socket.emit("message", {
      uidRecipient: uidRecipient,
      uidSendler: uidSendler,
      message: typedMessage.value,
    });

    typedMessage.value = "";

    setTimeout(() => {
      msgList ? (msgList.scrollTop = msgList.scrollHeight) : "";
    }, 100);
  }
}
