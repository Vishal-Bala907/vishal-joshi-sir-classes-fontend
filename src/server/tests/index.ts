import axios from "axios";

export const getTestByType = async (type?: string) => {
  try {
    let response;
    if (type) {
      response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tests/all?type=${type}`
      );
    } else {
      response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tests/all`
      );
    }
    return response.data;
  } catch (error: any) {
    return error || { message: "Something went wrong" };
  }
};

export const createTest = async (data: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tests/create`,
      data
    );
    return response.data;
  } catch (error: any) {
    return error.response?.data || { message: "Something went wrong" };
  }
};

export const deleteTest = async (testId: string) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tests/delete/${testId}`
    );
    return response.data;
  } catch (error: any) {
    return error.response?.data || { message: "Something went wrong" };
  }
};

export const getSingleTest = async (testId: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tests/${testId}`
    );
    return response.data.data.test;
  } catch (error: any) {
    return error.response?.data || { message: "Something went wrong" };
  }
};

export const submitTest = async (data: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tests/test-completed`,
      data
    );
    return response.data;
  } catch (error: any) {
    return error.response?.data || { message: "Something went wrong" };
  }
};

export const updateTest = async (testId: string, data: any) => {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tests/update/${testId}`,
      data
    );
    return response.data;
  } catch (error: any) {
    return error.response?.data || { message: "Something went wrong" };
  }
};

export const getTestLeaderBoard = async (testId: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tests/test-leader-board/${testId}`
    );
    return response.data;
  } catch (error: any) {
    return error || { message: "Something went wrong" };
  }
};
