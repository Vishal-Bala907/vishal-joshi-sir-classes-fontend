import axios from "axios";
import apiClient from "../config/axiosConfig";

export const startStudySession = async (userId: string, subject: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/studyMode/startStudySession`,
      {
        userId,
        subject,
      }
    );
    return response.data;
  } catch (error: any) {
    return error.response?.data || { message: "Something went wrong" };
  }
};

export const stopStudySession = async (data: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/studyMode/stopStudySession`,
      data
    );
    return response.data;
  } catch (error: any) {
    return error.response?.data || { message: "Something went wrong" };
  }
};

export const fetchStudySessions = async (userId: string) => {
  // Example API call
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/studyMode/study-sessions?userId=${userId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch study sessions");
  }
  const data = await response.json();
  return data; // Array of session data
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
export const updateImage = async (obj: any) => {
  console.log(obj);
  try {
    const response = await apiClient.post(`/api/v1/update-image`, obj);
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
export const fetchAllStudySessions = async (userId: string) => {
  try {
    const response = await apiClient.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/studyMode/all/${userId}`
    );
    return response.data;
  } catch (error: any) {
    return error.response?.data || { message: "Something went wrong" };
  }
};
