import type { NextApiRequest, NextApiResponse } from 'next';
import type { HospitalData } from '../../../components/Hospitals/HospitalData.model';

const hospitalsUrl = "https://communitybenefitinsight.org/api";

interface HospitalDataResponse {
  hospitalData: HospitalData[];
}

// Handler to get hospital data. Returns a list of all the fiscal years of the hospital with its data
const handler = async (req: NextApiRequest, res: NextApiResponse<HospitalDataResponse | string | unknown>) => {

  const { hospital_id } = req.query;
  try {
    const response = await fetch(`${hospitalsUrl}/get_hospital_data.php?hospital_id=${hospital_id}`);
    const hospitalData = await response.json();
    const apiResponse: HospitalDataResponse = { hospitalData };
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