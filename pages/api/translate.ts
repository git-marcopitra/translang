import type { NextApiRequest, NextApiResponse } from 'next';
import { recognizeImage } from '../../server';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: `${Infinity}mb`
    },
  },
}

const translate = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  console.log('Request :::: ',req)
  const img = req.body
  console.log('Image :::: ', img);
  try {
    const result = await recognizeImage(img);
    res.status(200).json(result);
  } catch {
    res.status(401).statusMessage = "Bad request";
  }
}

export default translate;

