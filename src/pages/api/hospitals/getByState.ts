import type { NextApiRequest, NextApiResponse } from 'next';
import type { Hospital } from '../../../components/Hospitals/Hospital.model';
import getConfig from "next/config";
import { HospitalData } from '../../../components/Hospitals/HospitalData.model';

const hospitalsUrl = "https://communitybenefitinsight.org/api";

interface HospitalResponse {
  hospitals: Hospital[];
}
// Use only when mockin data
// const getHospitalsDataByState = async (): Promise<Hospital[]> => {
//   const { publicRuntimeConfig } = getConfig();
//   const response = await fetch(`${publicRuntimeConfig.baseUrl}/sampleData/hospitalsAR.json`);

//   return response.json();
// }

const handler = async (req: NextApiRequest, res: NextApiResponse<HospitalResponse | string>) => {
  const { state } = req.query;
  try {
    const response = await fetch(`${hospitalsUrl}/get_hospitals.php?state=${state}`);
    const hospitals = await response.json();
    // const hospitals: Hospital[] = (await getHospitalsDataByState()).map((hospital: Hospital) => hospital); // only when mocking data
    const apiResponse: HospitalResponse = { hospitals };
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