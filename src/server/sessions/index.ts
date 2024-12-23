import axios from "axios";

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
