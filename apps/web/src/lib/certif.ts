import { getToken } from "./server";

const base_url = process.env.BASE_URL_API

/**
 * Fetch to generate a certificate by assessment ID
 * @param {number} assessmentId - The assessment ID for the certificate
 */
export async function fetchGenerateCertificate(assessmentId: number): Promise<Blob> {
  const token = await getToken();
  if (!token) {
    throw new Error('Authentication token is missing');
  }

  const response = await fetch(`${base_url}/certificate/generate/${assessmentId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to generate certificate');
  }

  return await response.blob(); // Pastikan mengembalikan Blob
}


/**
 * Fetch to verify a certificate by code
 * @param {number} code - The certificate code (assessment ID)
 */
export async function fetchVerifyCertificate(code: number): Promise<any> {
  const response = await fetch(`${base_url}/certificate/verify?code=${code}`, {
    method: "GET",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to verify certificate");
  }

  return await response.json();
}
