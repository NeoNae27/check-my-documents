import express from "express";
import path from "path";
import fs from "fs";
import multer from "multer";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Папка для сохранения файлов
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}.png`); // Сохраняем файл с уникальным именем и расширением .png
  },
});

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === "image/png") {
//     cb(null, true);
//   } else {
//     cb(new Error("Можно загружать только PNG файлы!"));
//   }
// };

const upload = multer({ storage });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "src")));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "index.html"));
});

app.post("/upload", upload.single("pngFile"), (req, res) => {
  console.log(req.file); // Debugging
  if (!req.file) {
    return res.status(400).send("No file uploaded!");
  }

  const filePath = req.file.path; // Temporary file path
  const originalName = req.file.originalname;
});

app.use((err, req, res, next) => {
  if (err) {
    console.error(err.message);
    res.status(400).send(err.message);
  } else {
    next();
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
