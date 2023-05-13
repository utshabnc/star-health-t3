import { xml2json } from 'xml-js';
import type { NextApiRequest, NextApiResponse } from "next";
import type { GeneticData } from "../../../../components/Genetics/GeneticData.model";

const chromosomeURL = "https://medlineplus.gov/download/genetics/chromosome";

interface ChromosomeDataResponse {
    chromosome: GeneticData[];
}

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<ChromosomeDataResponse | string | unknown>
) => {
    const { chromosome_name } = req.query;
    const url = `${chromosomeURL}/${chromosome_name}.json`;
    try {
        const response = await fetch(url);
        const chromosomeXML = await response.text();
        const chromosomeJSON: any = xml2json(chromosomeXML, { compact: true, spaces: 0 });
        const chromosome = JSON.parse(chromosomeJSON);
        const apiResponse: ChromosomeDataResponse = { chromosome };
        res.status(200).json(apiResponse);
    } catch (error) {
        const response = await fetch(url);
        const chromosomeJSON = await response.json();
        const apiResponse: ChromosomeDataResponse = { chromosome: chromosomeJSON };
        res.status(200).json(apiResponse);
    }

}

export default handler;
