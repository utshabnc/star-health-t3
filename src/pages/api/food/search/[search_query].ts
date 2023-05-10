import type { NextApiRequest, NextApiResponse } from 'next';

const food_auth_token = process.env.FOOD_AUTH;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { search_query } = req.query;
    try {
        const foodURL = "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=" + food_auth_token + "&query=" + search_query;
        const response = await fetch(foodURL);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
}
