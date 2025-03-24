function copyText() {
  const textEditor = document.getElementById("texteditor");
  const copy_icon = document.getElementById("copy_icon");

  if (textEditor.value != "") {
    navigator.clipboard.writeText(textEditor.value).then(function () {
      copy_icon.classList.remove("bx-copy");
      copy_icon.classList.add("bx-check");

      Toastify({
        text: "Copied to clipboard!",
        duration: 3000,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#363636",
        },
      }).showToast();

      setTimeout(() => {
        copy_icon.classList.remove("bx-check");
        copy_icon.classList.add("bx-copy");
      }, 500);
    });
  } else {
    Toastify({
      text: "Nothing to copy!",
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
