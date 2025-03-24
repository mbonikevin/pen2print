const textEditor = document.getElementById("texteditor");
const downloadBtn = document.getElementById("txtdownloadBtn");

function downloadTxt() {
  const text = textEditor.value.trim();
  if (text) {
    const blob = new Blob([text], { type: "text/plain" });
    const anchor = Object.assign(document.createElement("a"), {
      href: URL.createObjectURL(blob),
      download: "extracted_text.txt",
    });

    anchor.click();
    URL.revokeObjectURL(anchor.href);
  } else {
    Toastify({
      text: "Nothing to Download.",
      duration: 3000,
      gravity: "bottom",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "#363636",
      },
    }).showToast();
    return;
  }
}
