import { SingleStudyLegacy } from '../../../components/ClinicalTrials/ClinicalTrialsFullStudyResponse.model';
import { Field } from '../../../components/ClinicalTrials/Fields.enum';
import {createProxyMiddleware} from 'http-proxy-middleware';
import type {  ClinicalTrialStudies , ClinicalTrialStudy } from '../../../components/ClinicalTrials/ClinicalTrialsStudyFieldsResponse.model';
import type { NextApiRequest, NextApiResponse } from 'next';


const clinicalTrialsQueryURL = "https://clinicaltrials.gov/api/v2";




const handler = async (req : NextApiRequest, res : NextApiResponse) => {

    if(req.method !== 'GET') {
        return res.status(405).json({message: 'Method not allowed'});
    }

    const { NCTId  } = req.query;
    if(!NCTId) {
        return res.status(400).json({ message: 'NCTId is required' });
    }

    try {
        const response = await fetch(`${clinicalTrialsQueryURL}/studies/${NCTId}?format=json`);

        const data  = await response.json();

        if(data.error) {
            return res.status(500).json({ errors: data.error });
        }
        
        return res.status(200).json(data);
    }
    catch(error) {
        return res.status(500).json({ error });
    }
    
}

export default handler;