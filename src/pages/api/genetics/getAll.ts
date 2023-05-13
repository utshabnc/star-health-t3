import { xml2json } from 'xml-js';

const geneticsURL = 'https://medlineplus.gov/download/TopicIndex.xml';

export default async function handler(req: any, res: any) {
  try {
    const response = await fetch(geneticsURL);
    const xml = await response.text();
    const result: any = xml2json(xml, { compact: true, spaces: 0 });
    res.status(200).json(JSON.parse(result)['genetics_home_reference_topic_list']);
  } catch (error) {
    res.status(500).json({ error });
  }
}
