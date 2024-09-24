import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://zillow56.p.rapidapi.com/search',
  params: {
    location: 'houston, tx',
    output: 'json',
    status: 'forSale',
    sortSelection: 'priorityscore',
    listing_type: 'by_agent',
    doz: 'any'
  },
  headers: {
    'x-rapidapi-key': '83fb3fb2ddmshb53ff5d54c36e01p1f857ajsncefe4e2a5c68',
    'x-rapidapi-host': 'zillow56.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}
