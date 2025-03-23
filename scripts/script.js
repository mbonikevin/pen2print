// this function will update the line count for the text editor
function updateLineNumbers() {
  let texteditor = document.getElementById("texteditor");
  let lineNumbers = document.getElementById("lineNumbers");

  let lines =
    Math.ceil(
      texteditor.scrollHeight /
        parseFloat(getComputedStyle(texteditor).lineHeight)
    ) || 1;
  lineNumbers.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join(
    "\n"
  );
}
// this function will sync both elements, when i scroll in the text area it will sync and scroll
// line count div too
function syncScroll() {
  document.getElementById("lineNumbers").scrollTop =
    document.getElementById("texteditor").scrollTop;
}

// here I'm making sure line count is being updated on windows resize and when windows loads
window.addEventListener("load", function () {
  document.getElementById("texteditor").value = ""; // this is going to clear textarea on refresh or reload
  updateLineNumbers(); // and also update line count too
});
window.addEventListener("resize", updateLineNumbers);
document
  .getElementById("texteditor")
  .addEventListener("input", updateLineNumbers);
document.getElementById("texteditor").addEventListener("scroll", syncScroll);
