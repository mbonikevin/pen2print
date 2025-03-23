document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("imageInput");
  const uploadTrigger = document.getElementById("uploadTrigger");
  const upload_status = document.getElementById("upload_status");
  const upload_defaults = document.getElementById("upload_defaults");
  const upload_cta = document.getElementById("upload_cta");
  const loadingIndicator = document.getElementById("loadingIndicator");
  const textEditor = document.getElementById("texteditor");

  uploadTrigger.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", (e) => {
    if (e.target.files[0]) {
      toggleLoading(true);
      processImage(e.target.files[0]);
    }
  });

  document.querySelectorAll(".example-image-btn").forEach((btn) =>
    btn.addEventListener("click", () => {
      toggleLoading(true);
      fetch(btn.getAttribute("data-src"))
        .then((res) => res.blob())
        .then((blob) =>
          processImage(new File([blob], "example.jpg", { type: "image/jpeg" }))
        )
        .catch(console.error);
    })
  );

  function toggleLoading(isLoading) {
    if (isLoading) {
      //   upload_cta.style.display = "none";
      //   upload_defaults.style.display = "none";
      loadingIndicator.style.opacity = 1;
      loadingIndicator.style.zIndex = 10;
      upload_status.innerHTML = "Uploading...";
      setTimeout(() => {
        upload_status.innerHTML = "Processing...";
      }, 1600);
      setTimeout(() => {
        upload_status.innerHTML = "Doing something...";
      }, 3400);
    } else {
      //   upload_cta.style.display = "flex";
      //   upload_defaults.style.display = "block";
      loadingIndicator.style.opacity = 0;
      setTimeout(() => {
        loadingIndicator.style.zIndex = -10;
      }, 300);
    //   loadingIndicator.style.display = "none";
      textEditor.removeAttribute("readonly");
    }
  }

  async function processImage(file) {
    const formData = new FormData();
    formData.append("includeSubScan", "0");
    formData.append("srcImg", file);
    formData.append("Session", "string");
    await uploadToOCR(formData);
  }

  async function uploadToOCR(imageData) {
    try {
      const res = await fetch(
        "https://pen-to-print-handwriting-ocr.p.rapidapi.com/recognize/",
        {
          method: "POST",
          headers: {
            "x-rapidapi-key": CONFIG.RAPIDAPI_KEY,
            "x-rapidapi-host": "pen-to-print-handwriting-ocr.p.rapidapi.com",
          },
          body: imageData,
        }
      );
      const result = await res.json();
      textEditor.value = result.value || "No text detected";
    } catch (error) {
      console.error("Error extracting text:", error);
    } finally {
      toggleLoading(false);
    }
  }
});
