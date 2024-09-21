import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.get('https://api.zillow.com/v1/property', {
      params: {
        zpid: '12345', // Replace with actual property ID or other parameters
        apikey: process.env.ZILLOW_API_KEY // Use environment variable for API key
      }
    })
    res.status(200).json({ listings: response.data.listings })
  } catch (error) {
    console.error('Error fetching data from Zillow API:', error)
    res.status(500).json({ error: 'Error fetching data from Zillow API' })
  }
}
