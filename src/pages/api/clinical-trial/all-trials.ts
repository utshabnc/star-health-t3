import { Field } from './../../../components/ClinicalTrials/Fields.enum';
import { NextApiRequest, NextApiResponse } from 'next';

const clinicalTrialsQueryURL = "https://clinicaltrials.gov/api/v2";

// Extend the NextApiRequest type to include the query object
type NextApiRequestWithQuery = NextApiRequest & { 
    query : {
        fields: Field[] , 
        expr : string
    }
}

const handler = async (req: NextApiRequestWithQuery, res: NextApiResponse) => {

    if(req.method !== 'GET') {
        return res.status(405).json({message: 'Method not allowed'});
    }

    const {  fields , expr  } = req.query;

    if (!fields) {
        return res.status(400).json({ message: 'fields is required' });
    }



    try {

        const response =  await fetch(`${clinicalTrialsQueryURL}/studies?format=json&pageSize=100&fields=${fields}&query.term=${expr}`);
       
        const data = await response.json();
        
        return res.status(200).json(data);
    }
    catch(error) {
        return res.status(500).json({ error });
    }
}

export default handler; 