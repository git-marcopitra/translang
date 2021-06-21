import path from "path";
import { createWorker, ImageLike } from "tesseract.js";

const recognizeImage = async (image: string): Promise<string> => {
  console.log("In");
  const worker = createWorker({
    logger: (m) => console.log(m),
  });
  await worker.load();
  await worker.loadLanguage("eng");
  await worker.initialize("eng");
  const {
    data: { text },
  } = await worker.recognize("https://www.google.com/url?sa=i&url=https%3A%2F%2Fstackoverflow.com%2Fquestions%2F39258661%2Focr-extract-text-from-image&psig=AOvVaw0WRbLvuyy1IMx8KZBr3vCN&ust=1624326675587000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCNjg_sjOp_ECFQAAAAAdAAAAABAJ");
  await worker.terminate();
  return text;
};

export default recognizeImage;
