import { Cv, CvContent } from '@/types/cvgenerator';
import { getToken } from './server';

const base_url = process.env.BASE_URL_API

export const getCvs = async (
  cv_id?: string,
): Promise<{
  cvs: Cv[] | null;
  ok: boolean;
}> => {
  try {
    const token = await getToken(); // Pastikan token valid
    if (!token) {
      throw new Error('No token found');
    }

    const endpoint = cv_id
      ? `${base_url}/cv/${cv_id}`
      : `${base_url}/cv`;

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error('API Error:', response.status, response.statusText); // Tambahkan log error
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Raw Data:', data); // Debug data mentah dari API
    return { cvs: data.cvs || null, ok: true };
  } catch (error) {
    console.error('Error fetching CVs:', error);
    return { cvs: null, ok: false };
  }
};


export const createCv = async (
  template: string,
  content: CvContent,
): Promise<{
  cv: Cv | null;
  ok: boolean;
}> => {
  try {
    const token = await getToken(); // Pastikan token valid
    if (!token) {
      throw new Error('No token found');
    }
    const response = await fetch(`${base_url}/cv/generator`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ template, content }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data: Cv = await response.json();
    return { cv: data, ok: true };
  } catch (error) {
    console.error('Error creating CV:', error);
    return { cv: null, ok: false };
  }
};

export const downloadCv = async (
  cv_id: string,
): Promise<{
  file: Blob | null;
  ok: boolean;
}> => {
  try {
    const token = await getToken(); // Pastikan token valid
    if (!token) {
      throw new Error('No token found');
    }
    const response = await fetch(`${base_url}/cv/${cv_id}/download`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const reader = response.body?.getReader();
    const stream = new ReadableStream({
      start(controller) {
        function push() {
          reader?.read().then(({ done, value }) => {
            if (done) {
              controller.close();
              return;
            }
            controller.enqueue(value);
            push();
          });
        }
        push();
      },
    });

    const responseStream = new Response(stream);
    const file = await responseStream.blob();
    return { file, ok: true };
  } catch (error) {
    console.error('Error downloading CV:', error);
    return { file: null, ok: false };
  }
};
