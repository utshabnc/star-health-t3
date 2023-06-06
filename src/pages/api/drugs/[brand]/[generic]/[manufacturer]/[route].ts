import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { brand, generic, manufacturer, route } = req.query;
  try {
    const drugURL = `https://api.fda.gov/drug/drugsfda.json?search=openfda.brand_name:"${brand}" AND openfda.generic_name:"${generic}" AND openfda.manufacturer_name:"${manufacturer}" AND openfda.route:"${route}"&limit=100`;
    const response = await fetch(drugURL);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
}
