import express from "express";
import path from "path";
import upload from "./multerConfig.js";
import { fileURLToPath } from "url";
import { docAnswer } from "./layoutLM.js";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "src")));
app.use(express.json());

// GET

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "index.html"));
});

app.get("/image/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "uploads", filename);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(err);
      res.status(404).send("File Not Found");
    }
  });
});

// POST

app.post("/upload", upload.single("pngFile"), async (req, res) => {
  const question = req.body.userQuestion;
  const file = req.file;

  if (!file) {
    return res.status(400).send("Load Fail");
  }

  const filePath = `/image/${path.basename(req.file.path)}`;
  const result = await docAnswer(filePath, question);

  res.json({ imageUrl: filePath, answer: result });
});

// LISTEN

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
