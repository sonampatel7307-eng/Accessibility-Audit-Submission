// Accessible modal dialog functionality

const buttons = document.querySelectorAll("button[aria-label]");
const dialog = document.createElement("dialog");

dialog.setAttribute("aria-labelledby", "dialog-title");

dialog.innerHTML = `
  <h2 id="dialog-title">Service Details</h2>
  <p>This service is available and accessible for enterprise users.</p>
  <button type="button" id="close-dialog">Close</button>
`;

document.body.appendChild(dialog);

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    dialog.showModal();
    document.getElementById("close-dialog").focus();
  });
});

document.addEventListener("click", (event) => {
  if (event.target.id === "close-dialog") {
    dialog.close();
  }
});

dialog.addEventListener("cancel", () => {
  dialog.close();
});
