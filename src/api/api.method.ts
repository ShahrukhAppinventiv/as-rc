import { axiosInstance } from "./api.config";

const postApiCall = async (endpoint: string, payload?: object) => {
  try {
    const response = await axiosInstance.post(endpoint, payload);
    return {
      success: true,
      data: response.data,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};
const getApiCall = async (endpoint: string, params?: any) => {
  try {
    const response = await axiosInstance.get(endpoint, { params });
    return {
      success: true,
      data: response.data,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const putApiCall = async (endpoint: string, payload?: object) => {
  try {
    const response = await axiosInstance.put(endpoint, payload);
    return {
      success: true,
      data: response.data,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export { getApiCall, postApiCall, putApiCall };
