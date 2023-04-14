import type { NextApiRequest, NextApiResponse } from 'next';
import type { Hospital } from '../../../components/Hospitals/Hospital.model';

const hospitalsUrl = "https://communitybenefitinsight.org/api";

interface HospitalResponse {
  hospitals: Hospital[];
}

const handler = async (req: NextApiRequest, res: NextApiResponse<HospitalResponse | string | unknown>) => {
  try {
    const response = await fetch(`${hospitalsUrl}/get_hospitals.php`);
    const hospitals = await response.json();
    const apiResponse: HospitalResponse = { hospitals };
    res.status(200).json(apiResponse);
  } catch(error: any) {
    if (error?.type == "invalid-json") { // This error means that the current user reached the limit of requests for the api
      return res.status(503).send({
        msg: "Hospital Data is not available -- please check back in 24 hours for an update",
        service: "Hospitals"
      });
    }
    return res.status(400).send({msg: "There was an error"})
  }
};


export default handler;