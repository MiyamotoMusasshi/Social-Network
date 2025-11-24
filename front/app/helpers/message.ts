import { socket } from "app/helpers/socket";

export default function message(
  uidRecipient: string | undefined,
  uidSendler: string | undefined
) {
  const typedMessage: any = document.querySelector("#typed-message");

  if (typedMessage.value != "") {
    socket.emit("message", {
      uidRecipient: uidRecipient,
      uidSendler: uidSendler,
      message: typedMessage.value,
      date: {
        hours: new Date().getHours(),
        minutes: new Date().getMinutes(),
        day: new Date().getDate(),
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
      },
      dateForSorting: new Date().getTime(),
    });

    typedMessage.value = "";
  }
}
