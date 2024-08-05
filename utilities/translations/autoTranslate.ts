import axios, { AxiosRequestConfig } from 'axios';
import { v4 as uuidv4 } from 'uuid';

const autoTranslate = async (text: string, from: string, to: string) => {
  let key = process.env.NEXT_PUBLIC_TRANSLATION_API_KEY;
  let endpoint = process.env.NEXT_PUBLIC_TRANSLATION_END_POINT;
  let location = process.env.NEXT_PUBLIC_TRANSLATION_LOCATION;

  try {
    const config: AxiosRequestConfig = {
      baseURL: `${endpoint}/translate`,
      method: 'post',
      headers: {
        'Ocp-Apim-Subscription-Key': key!,
        'Ocp-Apim-Subscription-Region': location!,
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'X-ClientTraceId': uuidv4().toString(),
      },
      params: {
        'api-version': '3.0',
        from: from,
        to: to,
      },
      data: [
        {
          text: text,
        },
      ],
      responseType: 'json',
    };

    const response = await axios(config);

    return response.data; // Return the translated data
  } catch (error) {
    console.error('Error fetching translation:', error);
    throw error; // Throw the error to handle it in the component
  }
};

export default autoTranslate;
