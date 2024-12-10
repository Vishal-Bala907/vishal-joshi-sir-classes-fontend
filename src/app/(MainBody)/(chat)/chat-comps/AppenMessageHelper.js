const appendMessageToTheBottomOnSend = (MESSAGE) => {
  const msgDiv = document.createElement("div");
  msgDiv.className = `msg right-msg`;

  // console.log(MESSAGE);

  if (MESSAGE.senderName) {
    const imgDiv = document.createElement("div");
    imgDiv.className = "msg-img";
    msgDiv.appendChild(imgDiv);
  }

  const bubbleDiv = document.createElement("div");
  bubbleDiv.className = "msg-bubble mx-2";

  const infoDiv = document.createElement("div");
  infoDiv.className = "msg-info";

  const nameDiv = document.createElement("div");
  nameDiv.className = "msg-info-name";
  nameDiv.textContent = MESSAGE.recipientName
    ? MESSAGE.senderName || ""
    : "admin";

  const timeDiv = document.createElement("div");
  timeDiv.className = "msg-info-time";
  timeDiv.textContent = "now";

  infoDiv.appendChild(nameDiv);
  infoDiv.appendChild(timeDiv);

  const textDiv = document.createElement("div");
  textDiv.className = "msg-text";
  textDiv.textContent = MESSAGE.message;

  bubbleDiv.appendChild(infoDiv);
  bubbleDiv.appendChild(textDiv);

  msgDiv.appendChild(bubbleDiv);
  // msgContainer.current.appendChild(msgDiv);
  document.getElementById("chat-container")?.appendChild(msgDiv);
};

export default appendMessageToTheBottomOnSend;
