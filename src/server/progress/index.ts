import axios from "axios";

export const getMyProgress = async (progressId: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/progress/${progressId}`
    );
    return response.data;
  } catch (error: any) {
    return error || { message: "Something went wrong" };
  }
};
