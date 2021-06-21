import type { NextApiRequest, NextApiResponse } from 'next'
import { recognizeImage } from '../../server';

const translate = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const data = req.body;
  console.log('Data :::: ', data);
  try {
    const result = await recognizeImage(data.picture);
    res.status(200).json(result);
  } catch {
    res.status(401);
  }
}

export default translate;
