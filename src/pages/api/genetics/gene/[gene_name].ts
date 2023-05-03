import type { NextApiRequest, NextApiResponse } from "next";
import type { GeneticData } from "../../../../components/Genetics/GeneticData.model";

const geneURL = "https://medlineplus.gov/download/genetics/gene";

interface GeneDataResponse {
  gene: GeneticData[];
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<GeneDataResponse | string | unknown>
) => {
  const { gene_name } = req.query;
  const url = `${geneURL}/${gene_name}.json`;
  const response = await fetch(url);
  const gene = await response.json();
  const apiResponse: GeneDataResponse = { gene };
  res.status(200).json(apiResponse);
};

export default handler;
