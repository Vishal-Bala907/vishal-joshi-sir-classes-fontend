import axios from "axios";
import apiClient from "../config/axiosConfig";

interface Session {
  sessionName: string;
  time: string;
  date: string;
}

export const createSessionAlert = async (session: Session) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/session/create`,
      session
    );
    return response.data; // Return the data received from the server
  } catch (error: any) {
    console.error("Error creating session:", error);
    return error.response?.data || { message: "Something went wrong" };
  }
};
export const updateSessionById = async (status: string, sessionId: string) => {
  // alert(status);
  // alert(sessionId);
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/session/update/${status}/${sessionId}`
    );
    return response.data; // Return the data received from the server
  } catch (error: any) {
    console.error("Error creating session:", error);
    return error.response?.data || { message: "Something went wrong" };
  }
};

export const getAllTodaysSession = async () => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/session/get/today`
    );
    return response.data; // Return the data received from the server
  } catch (error: any) {
    console.error("Error creating session:", error);
    return error.response?.data || { message: "Something went wrong" };
  }
};

export const goLIve = async (
  sessionId: String,
  role: String,
  userId: String
) => {
  try {
    const response = await apiClient.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/session/goLive/${sessionId}/${role}/${userId}`
    );
    return response.data; // Return the data received from the server
  } catch (error: any) {
    console.error("Error creating session:", error);
    return error.response?.data || { message: "Something went wrong" };
  }
};

export const getAllSessionsOfThisMonths = async (date: String) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/session/all/month/${date}`
    );
    return response.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};
