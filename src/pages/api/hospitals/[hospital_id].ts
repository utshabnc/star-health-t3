import type { NextApiRequest, NextApiResponse } from 'next';
import getConfig from "next/config";
import type { HospitalData } from '../../../components/Hospitals/HospitalData.model';

const hospitalsUrl = "https://communitybenefitinsight.org/api";

interface HospitalDataResponse {
  hospitalData: HospitalData[];
}

// const getHospitalData = async (hospital_id: any): Promise<HospitalData[]> => {
//   const { publicRuntimeConfig } = getConfig();
//   const response = await fetch(`${publicRuntimeConfig.baseUrl}/sampleData/hospitalData${hospital_id}.json`);

//   return response.json();
// }

// Handler to get hospital data. Returns a list of all the fiscal years of the hospital with its data
const handler = async (req: NextApiRequest, res: NextApiResponse<HospitalDataResponse | string>) => {

  const { hospital_id } = req.query;
  try {
    const response = await fetch(`${hospitalsUrl}/get_hospital_data.php?hospital_id=${hospital_id}`);
    const hospitalData = await response.json();
    // const hospitalData: HospitalData[] = 
      // (await getHospitalData(hospital_id)).map((hospitalData: HospitalData) => hospitalData);
    const apiResponse: HospitalDataResponse = { hospitalData };
    await delay(2000);
    res.status(200).json(apiResponse);
  } catch(error) {
    res.status(400).json("ERROR: " + error);
  }


};

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

export default handler;