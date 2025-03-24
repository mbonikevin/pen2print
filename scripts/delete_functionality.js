function emptyTextEditor() {
  const textEditor = document.getElementById("texteditor");
  if (textEditor.value !== "") {
    textEditor.value = "";
    textEditor.readOnly = true;
    Toastify({
      text: "Text cleared!",
      duration: 3000,
      gravity: "bottom",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "#363636",
      },
    }).showToast();
  } else {
    Toastify({
      text: "Already empty!",
      duration: 3000,
      gravity: "bottom",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "#363636",
      },
    }).showToast();
  }
}
