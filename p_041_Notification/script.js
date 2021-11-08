const button = document.getElementById("button");
const toastHolder = document.getElementById("toastHolder");
const messages = ["msg1", "msg2", "msg3", "msg4", "msg5", "msg6"];
const types = ["info", "success", "error"];

button.addEventListener("click", () => createNotification());

function createNotification(message = null, type = null) {
  const notif = document.createElement("div");
  notif.classList.add("toast");
  const msgType = type ? type : getRandomType();
  notif.classList.add(msgType);
  notif.innerText = message
    ? message + " " + msgType
    : getRandomMessage() + " " + msgType;
  toastHolder.appendChild(notif);

  setTimeout(() => {
    notif.remove(); //******/
  }, 2000);
}

function getRandomMessage() {
  return messages[Math.floor(Math.random() * messages.length)];
}

function getRandomType() {
  return types[Math.floor(Math.random() * types.length)];
}
