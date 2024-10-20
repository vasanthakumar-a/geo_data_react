import axiosInstance from "../lib/axios";

export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post("/login", {user:{...credentials}});
    if (response.error) {
      throw new Error("Invalid credentials");
    }
    if (response.data) {
      return { email: response.data.user.email, token: response.data.token };
    }
  } catch (error) {
    throw error.response?.data || { message: "Login failed!" };
  }
};