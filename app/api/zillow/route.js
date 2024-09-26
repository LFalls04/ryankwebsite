import { fetchZillowData } from '../../../lib/zillowApi';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get('endpoint');
  const params = Object.fromEntries(searchParams.entries());

  if (!endpoint) {
    return new Response(JSON.stringify({ error: 'Endpoint is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const data = await fetchZillowData(endpoint, params);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch Zillow data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
