import { NextApiRequest, NextApiResponse } from 'next';
import { fetchPropertiesFromZillow } from '../../../lib/zillowApi';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const properties = await fetchPropertiesFromZillow();
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}