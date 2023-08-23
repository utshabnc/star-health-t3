import type { NextApiRequest, NextApiResponse } from 'next';

const CALORIENINJA_APIKEY = "STxbK5ZwjGUA+BhOyURfqQ==2JxCpBThyqsXTcWV";
export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const { recipe } = req.query;
    const response = await fetch(`https://api.calorieninjas.com/v1/recipe?query=${encodeURIComponent(recipe as string)}`, {
      method: "GET",
      headers: {
        'X-Api-Key': CALORIENINJA_APIKEY,
        'Access-Control-Allow-Origin': 'https://calorieninjas.com',
        'Origin': 'https://calorieninjas.com'
      }
    });


    const recipes = await response.json();
    console.log(recipes);
    res.status(200).json(recipes);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
