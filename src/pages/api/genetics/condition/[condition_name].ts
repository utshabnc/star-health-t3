import type { NextApiRequest, NextApiResponse } from "next";
import type { GeneticData } from "../../../../components/Genetics/GeneticData.model";

const conditionURL = "https://medlineplus.gov/download/genetics/condition";

interface ConditionDataResponse {
  condition: GeneticData[];
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ConditionDataResponse | string | unknown>
) => {
  const { condition_name } = req.query;
  const url = `${conditionURL}/${condition_name}.json`;
  const response = await fetch(url);
  const condition = await response.json();
  const apiResponse: ConditionDataResponse = { condition };
  res.status(200).json(apiResponse);
};

export default handler;
