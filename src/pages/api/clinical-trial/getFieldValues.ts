import { Field } from './../../../components/ClinicalTrials/Fields.enum';
import { NextApiRequest, NextApiResponse } from 'next';

const clinicalTrialsQueryURL = "https://clinicaltrials.gov/api/v2";

// Extend the NextApiRequest type to include the query object
type NextApiRequestWithQuery = NextApiRequest & { 
    query : {
        fields: Field , 
    }
}

const handler = async (req: NextApiRequestWithQuery, res: NextApiResponse) => {

    if(req.method !== 'GET') {
        return res.status(405).json({message: 'Method not allowed'});
    }

    const {  fieldValue   } = req.query;

    if (!fieldValue) {
        return res.status(400).json({ message: 'fields is required' });
    }


    try {

        const response =  await fetch(`${clinicalTrialsQueryURL}/stats/fieldValues/${fieldValue}`);
       
        const data = await response.json();
        
        return res.status(200).json(data);
    }
    catch(error) {
        
        return res.status(500).json({ error });
    }
}

export default handler; 