import api from "./axios";

export const isAuthenticated = async () => {
  try {
    const response = await api.get("auth/me");

    return response.data?.success === true;
  } catch (error) {
    console.log(
      "Auth check error:",
      error.response?.status,
      error.response?.data
    );

    return false;
  }
};