function sendMessage() {
    let msg = document.getElementById("msg").value;
    let chatBox = document.getElementById("chatBox");

    let p = document.createElement("p");
    p.innerText = msg;

    chatBox.appendChild(p);
    document.getElementById("msg").value = "";
}
