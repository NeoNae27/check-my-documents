import express from "express";
import path from "path";
import upload from "./multerConfig.js";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "src")));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "index.html"));
});

app.post("/upload", upload.single("pngFile"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("Load Fail");
  }

  const filePath = req.file.path;
  console.log(`File Load: ${filePath}`);
  res.send(`File Load: ${filePath}`);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
