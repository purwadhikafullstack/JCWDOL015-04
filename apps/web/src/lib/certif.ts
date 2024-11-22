import { getToken } from "./server";

const base_url = process.env.NEXT_PUBLIC_BASE_API_URL;

/**
 * Fetch to generate a certificate by score ID
 * @param {number} scoreId - The score ID for the certificate
 */
export async function fetchGenerateCertificate(scoreId: number): Promise<Blob> {
  const token = await getToken();
  if (!token) {
    throw new Error("Authentication token is missing");
  }

  const response = await fetch(`${base_url}/certificate/generate/${scoreId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to generate certificate");
  }

  return await response.blob(); // Mengembalikan Blob untuk file PDF
}

/**
 * Fetch to verify a certificate by unique code
 * @param {string} uniqueCode - The unique code for the certificate
 */
export async function fetchVerifyCertificate(uniqueCode: string): Promise<any> {
  const response = await fetch(`${base_url}/certificate/verify?code=${uniqueCode}`, {
    method: "GET",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to verify certificate");
  }

  return await response.json(); // Mengembalikan data JSON
}
