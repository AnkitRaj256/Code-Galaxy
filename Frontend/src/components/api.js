import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:8000/api/v1/",
    withCredentials: true,
});

const googleAuth = async (code) => {
    try {
      const response = await api.get(`/googleLogin?code=${code}`);
      return response;
    } catch (error) {
      console.error("Error in googleAuth:", error);  // Log any errors
      throw error;  // Rethrow the error after logging it
    }
};
  
export default googleAuth;
  