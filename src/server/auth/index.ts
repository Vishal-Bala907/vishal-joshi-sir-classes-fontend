import axios from "axios";
// Sign Up API Call
export const signUp = async (email: string, password: string, name: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signup`,
      {
        email,
        password,
        name,
      }
    );
    return response.data;
  } catch (error: any) {
    return error.response?.data || { message: "Something went wrong" };
  }
};

// Sign In API Call
export const signIn = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signin`,
      {
        email,
        password,
      }
    );
    const data = response.data;
    console.log(data);
    return data;
  } catch (error: any) {
    return error || { message: "Something went wrong" };
  }
};

// Request Password Reset API Call
export const requestPasswordReset = async (email: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/forget-password`,
      {
        email,
      }
    );
    return response.data;
  } catch (error: any) {
    return error.response?.data || { message: "Something went wrong" };
  }
};

// Update Password API Call
export const updatePassword = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/update-password`,
      {
        email,
        password,
      }
    );
    return response.data;
  } catch (error: any) {
    return error.response?.data || { message: "Something went wrong" };
  }
};
