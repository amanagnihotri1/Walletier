
import axios from 'axios';
const apiClient = axios.create({
  baseURL:         process.env.REACT_APP_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  },
   timeout: 10000,
});

const apiCall = async (
  method:  'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  url:     string,
  body?:   object,   // for POST PUT PATCH
  params?: object    // for GET query params ?key=value
) => {
  try {
    const response = await apiClient({
      method,
      url,
      data:   body,
      params
    });

    return { data: response.data, error: null };

  } catch (err: any) {
    return {
      data:  null,
      error: err.response?.data?.message || err.message || "Something went wrong"
    };
  }
};

export default apiCall;