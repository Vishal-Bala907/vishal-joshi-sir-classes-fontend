import apiClient from "../config/axiosConfig";
import axios from "axios";

export const getAllUsers = async () => {
  try {
    const response = await apiClient.get(`/api/v1/roles/users`);
    return response.data;
  } catch (error: any) {
    return error.response?.data || { message: "Something went wrong" };
  }
};

export const updateRole = async (userId: string, newRole: string) => {
  try {
    const response = await apiClient.post(
      `/api/v1/roles/updateRole/${userId}`,
      {
        newRole,
      }
    );
    return response.data;
  } catch (error: any) {
    return error.response?.data || { message: "Something went wrong" };
  }
};

export const getAllStudents = async (userId: String) => {
  try {
    const response = await apiClient.get(`/api/v1/roles/users/${userId}`);
    return response.data;
  } catch (error: any) {
    return error.response?.data || { message: "Something went wrong" };
  }
};

export const getAllMentors = async () => {
  try {
    const response = await apiClient.get(`/api/v1/roles/users/mentors`);
    return response.data;
  } catch (error: any) {
    return error.response?.data || { message: "Something went wrong" };
  }
};
