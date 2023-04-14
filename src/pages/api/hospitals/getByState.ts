import type { NextApiRequest, NextApiResponse } from 'next';
import type { Hospital } from '../../../components/Hospitals/Hospital.model';

const hospitalsUrl = "https://communitybenefitinsight.org/api";

interface HospitalResponse {
  hospitals: Hospital[];
}

const handler = async (req: NextApiRequest, res: NextApiResponse<HospitalResponse | string | unknown>) => {
  const { state } = req.query;
  try {
    const response = await fetch(`${hospitalsUrl}/get_hospitals.php?state=${state}`);
    const hospitals = await response.json();
    const apiResponse: HospitalResponse = { hospitals };
    await delay(2000);
    res.status(200).json(apiResponse);
  } catch(error: any) {
    if (error?.type == "invalid-json") { // This error means that the current user reached the limit of requests for the api
      res.status(503).end({
        msg: "Hospital Data is not available -- please check back in 24 hours for an update",
        service: "Hospitals"
      });
    }
    res.status(400).end({msg: "There was an error"})
  }

};

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

export default handler;