function Showinfo() {
  document.getElementById("info").classList.add("show");
}

function hideInfo(){
    document.getElementById("info").classList.remove("show");
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      hideInfo();
    }
  });
  
  