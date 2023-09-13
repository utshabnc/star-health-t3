import type { NextApiRequest, NextApiResponse } from "next";
import { toTitleCase } from "../../../utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { exp } = req.query;
  try {
    console.log(exp);
    const drugURL = `https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${exp}"&limit=10`;
    console.log(drugURL);
    const response = await fetch(drugURL);

    const output: any[] = [];
    const data = await response.json();

    if (data["results"]) {
      data["results"].forEach((element: any) => {
        // output.push({
        //   brand_name:element['openfda']['brand_name'],
        //   dosage: element['dosage_and_administration'],
        //   spl_id:element['openfda']['spl_id'],
        //   manufacturer_name:element['openfda']['manufacturer_name']
        // })
        console.log(element["openfda"]["spl_id"]);
        console.log(element["openfda"]["brand_name"]);

        output.push({
          id: element["openfda"]["spl_id"][0],
          dosage: element["dosage_and_administration"][0],
          manufacturer_name: element["openfda"]["manufacturer_name"][0],
          name: toTitleCase(element["openfda"]["brand_name"][0].toLowerCase()),
        });
      });
    }
    console.log(output);
    res.status(200).json({ drugs: output });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
