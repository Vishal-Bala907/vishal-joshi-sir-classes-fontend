import axios from "axios";
import apiClient from "../config/axiosConfig";

export const startStudySession = async (userId: string, subject: string) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/studyMode/startStudySession`, {
      userId,
      subject,
    });
    return response.data;
  } catch (error: any) {
    return error.response?.data || { message: "Something went wrong" };
  }
};

export const stopStudySession = async (sessionId: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/studyMode/stopStudySession`,
      {
        sessionId,
      }
    );
    return response.data;
  } catch (error: any) {
    return error.response?.data || { message: "Something went wrong" };
  }
};

export const updateProfile = async (data: any) => {
  try {
    const response = await apiClient.put("/api/v1/me", {
      ...data,
    });
    return response.data;
  } catch (error: any) {
    return error.response?.data || { message: "Something went wrong" };
  }
};

export const getMyProfile = async (email: string) => {
  try {
    const response = await apiClient.post("/api/v1/me", { email });
    return response.data;
  } catch (error: any) {
    return error.response?.data || { message: "Something went wrong" };
  }
};

export const getOtherUserProfile = async (userId: string) => {
  try {
    const response = await apiClient.get(`/api/v1/users/${userId}`);
    return response.data;
  } catch (error: any) {
    return error.response?.data || { message: "Something went wrong" };
  }
};

export const getProgress = async (progressId: string) => {
  try {
    const response = await apiClient.get(`/api/v1/progress/${progressId}`);
    return response.data;
  } catch (error: any) {
    return error.response?.data || { message: "Something went wrong" };
  }
};

export const updateProgress = async (progressId: string, data: any) => {
  try {
    const response = await apiClient.post(
      `/api/v1/progress/${progressId}`,
      data
    );
    return response.data;
  } catch (error: any) {
    return error.response?.data || { message: "Something went wrong" };
  }
};
