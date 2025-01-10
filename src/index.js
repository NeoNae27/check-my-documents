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
      const result = await response.text();
      alert(`Файл успешно загружен: ${result}`);
    } else {
      alert(`Ошибка загрузки: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Ошибка:", error);
    alert("Не удалось загрузить файл.");
  }
}
