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

export const registerUser = async (credentials) => {
  try {
    const response = await axiosInstance.post("/register", {user:{...credentials}});
    if (response.error) {
      throw new Error("Invalid credentials");
    }
    if (response.data) {
      return { email: response.data.user.email, token: response.data.token };
    }
  } catch (error) {
    throw error.response?.data || { message: "Registeration failed!" };
  }
};

export const logoutUser = async (token) => {
  try {
    const response = await axiosInstance.post("/logout");
    if (response.error) {
      throw new Error("Invalid token!");
    }
    if (response.data) {
      return {};
    }
  } catch (error) {
    throw error.response?.data || { message: "Server Error!" };
  }
};