console.log("I am Working!");

async function sendImage() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];
  console.log(file);

  if (!file) {
    alert("Please Select a File!");
    return;
  }

  const formData = new FormData();
  formData.append("pngFile", file);

  try {
    const response = await fetch("/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      
      const imageUrl = result.imageUrl;
      const imageElement = document.createElement("img");
      
      imageElement.src = imageUrl;
      document.body.appendChild(imageElement);
      
      alert(`File Load: ${result}`);
    } else {
      alert(`Load Error: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Fatal Error");
  }
}
