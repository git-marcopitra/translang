import { createWorker, ImageLike } from 'tesseract.js';

const recognizeImage = async (image: ImageLike): Promise<string> => {
  console.log('In');
  const worker = createWorker({
    logger: (m) => console.log(m),
  });
  await worker.load();
  await worker.loadLanguage("eng");
  await worker.initialize("eng");
  const {
    data: { text },
  } = await worker.recognize(image);
  await worker.terminate();
  return text;
};

export default recognizeImage;
