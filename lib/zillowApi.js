// lib/zillowApi.js
export const fetchZillowData = async (endpoint, queryParams = {}) => {
    const query = new URLSearchParams(queryParams).toString();
    const url = `https://zillowapi.p.rapidapi.com/${endpoint}?${query}`;
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
          'X-RapidAPI-Host': process.env.RAPIDAPI_HOST,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch ZillowAPI data:', error);
      throw error;
    }
  };
  
  