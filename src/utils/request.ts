// Imports
// ========================================================
import axios, { AxiosRequestConfig } from 'axios';

// Config
// ========================================================
/**
 *
 */
const client = (() => {
  return axios.create({
    baseURL: `${import.meta.env.VITE_SERVER}`,
  });
})();

// Function
// ========================================================
const request = async (options: AxiosRequestConfig) => {
  // Functions
  /**
   *
   * @param response
   * @returns
   */
  const onSuccess = (response: any) => {
    console.log({ response });
    const {
      data: { data },
    } = response;
    return data;
  };

  /**
   *
   * @param error
   * @returns
   */
  const onError = (error: any) => {
    return Promise.reject(error.response);
  };

  // Return
  return client(options).then(onSuccess).catch(onError);
};

// Exports
// ========================================================
export default request;
