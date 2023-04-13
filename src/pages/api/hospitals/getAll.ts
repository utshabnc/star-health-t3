import type { NextApiRequest, NextApiResponse } from 'next';
import type { Hospital } from '../../../components/Hospitals/Hospital.model';
import getConfig from "next/config";
import { HospitalData } from '../../../components/Hospitals/HospitalData.model';

const hospitalsUrl = "https://communitybenefitinsight.org/api";

interface HospitalResponse {
  hospitals: Hospital[];
}
// Used when want to mock data
// const getHospitalsData = async (): Promise<Hospital[]> => {
//   const { publicRuntimeConfig } = getConfig();
//   const response = await fetch(`${publicRuntimeConfig.baseUrl}/sampleData/hospitals.json`);

//   return response.json();
// }

const handler = async (req: NextApiRequest, res: NextApiResponse<HospitalResponse | string>) => {
  try {
    const response = await fetch(`${hospitalsUrl}/get_hospitals.php`);
    const hospitals = await response.json();
    const apiResponse: HospitalResponse = { hospitals };
    res.status(200).json(apiResponse);
  } catch(error) {
    res.status(400).json("ERROR: " + error);
  }

};


export default handler;