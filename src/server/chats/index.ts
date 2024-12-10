import axios from "axios";

export const getChats = async (userId: string, selectedUser: String) => {
  try {
    // alert("sending");
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/chat/${userId}/${selectedUser}`
    );
    const data = await response.data;
    return data;
  } catch (error: any) {
    return error || { message: "Something went wrong" };
  }
};
