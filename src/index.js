console.log("I am Working!");

async function sendImage() {
  const fileInput = document.getElementById("fileInput");
  const questionInput = document.getElementById("questionInput");
  const answerArea = document.getElementById("answerArea");
  const file = fileInput.files[0];
  const question = questionInput.value;
  console.log(" QA " + question)

  if (!file) {
    alert("Please Select a File!");
    return;
  }

  const formData = new FormData();
  formData.append("pngFile", file);
  formData.append("userQuestion", question);

  try {
    const response = await fetch("/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();

      const imageUrl = result.imageUrl;
      const answer = result.answer;

      const imageElement = document.createElement("img");
      answerArea.value = answer;
      imageElement.src = imageUrl;
      document.body.appendChild(imageElement);
    } else {
      alert(`Load Error: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Fatal Error");
  }
}
