import fetch from 'node-fetch';

const openCageApi = process.env.OPENCAGE_API_KEY

/**
 * Geocode an address to get coordinates.
 * @param address - The address or placename to geocode.
 * @returns { latitude: number, longitude: number } or null if not found.
 */
export async function geocodeAddress(address: string) {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${openCageApi}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.results && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry;
      return { latitude: lat, longitude: lng };
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}
