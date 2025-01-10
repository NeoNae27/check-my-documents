import { pipeline } from "@huggingface/transformers";
import path from "path";

const qa_pipeline = await pipeline(
  "document-question-answering",
  "Xenova/donut-base-finetuned-docvqa"
);

export async function docAnswer(filePath, userQuestion) {
  console.log(filePath);
  const image = path.join("http://localhost:3000", filePath);
  const output = await qa_pipeline(image, userQuestion);
  const result = output[0].answer;
  
  return result;
}
