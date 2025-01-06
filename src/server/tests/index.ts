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

/**
 *
 * @param testObject
 *
 * @returns
 *
 * @author vishalbala
 *
 */

export const updateTestAttempt = async (testId: string) => {
  try {
  } catch (err: any) {
    return err.response?.data || { message: "Something went wrong" };
  }
};

export const getTests = async (role: any) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tests/api/get/test/${role}`
    );
    return response.data;
  } catch (error: any) {
    return error.response?.data || { message: "Something went wrong" };
  }
};
export const getAllAttendedTests = async (id: any) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tests/api/get/test/attended/${id}`
    );
    return response.data;
  } catch (error: any) {
    return error.response?.data || { message: "Something went wrong" };
  }
};
export const getTestById = async (id: any) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tests/api/get/test/testById/${id}`
    );
    return response.data;
  } catch (error: any) {
    return error.response?.data || { message: "Something went wrong" };
  }
};

export const attendTestNow = async (testId: string, studentId: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tests/api/attend/test/${testId}/${studentId}`
    );
    return response.data;
  } catch (error: any) {
    return error.response?.data || { message: "Something went wrong" };
  }
};
export const getTestDataFromBackend = async (
  testId: string,
  userId: string
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tests/api/attend/getdata/${testId}/${userId}`
    );
    return response.data;
  } catch (error: any) {
    return error.response?.data || { message: "Something went wrong" };
  }
};

export const getQuestion = async (questionId: string, questionType: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tests/api/attend/question/${questionId}/${questionType}`
    );
    return response.data;
  } catch (error: any) {
    return error.response?.data || { message: "Something went wrong" };
  }
};

export const addTestMetaData = async (testMetaData: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tests/api/create/meta`,
      testMetaData
    );
    const res = await response.data;
    console.log(res);
    return res;
  } catch (error: any) {
    return error.response?.data || { message: "Something went wrong" };
  }
};

//! reschedule test
export const rescheduleTest = async (test: any) => {
  // console.log(test);
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tests/api/create/res`,
      test
    );
    const res = await response.data;
    // console.log(res);
    return res;
  } catch (error: any) {
    throw error;
  }
};

export const addIntegerQuestion = async (question: any, id: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tests/api/create/int/${id}`,
      question
    );
    return response.data;
  } catch (error: any) {
    return error.response?.data || { message: "Something went wrong" };
  }
};

export const addSelectTypeQuestion = async (question: any, id: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tests/api/create/select/${id}`,
      question
    );
    return response.data;
  } catch (error: any) {
    return error.response?.data || { message: "Something went wrong" };
  }
};
export const addMatchTheColumnQuestion = async (question: any, id: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tests/api/create/match/${id}`,
      question
    );
    return response.data;
  } catch (error: any) {
    return error.response?.data || { message: "Something went wrong" };
  }
};

// export const submitTestQuestion = async (testQuestionData: any) => {
//   const formData = new FormData();

//   // Append questions and other data
//   formData.append("Questions", JSON.stringify(testQuestionData.Questions));
//   formData.append("category", testQuestionData.category);
//   formData.append("date", testQuestionData.date);
//   formData.append("description", testQuestionData.description);
//   formData.append("instructions", testQuestionData.instructions);
//   formData.append("negativeMarking", testQuestionData.negativeMarking);
//   formData.append("positiveMarking", testQuestionData.positiveMarking);
//   formData.append("testName", testQuestionData.testName);
//   formData.append("time", testQuestionData.time);
//   formData.append("timeDuration", testQuestionData.timeDuration);

//   // Append the image if it exists
//   if (testQuestionData.descriptionImage) {
//     formData.append("descriptionImage", testQuestionData.descriptionImage[0]);
//   }

//   try {
//     const response = await axios.post(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tests/api/create`,
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );
//     return response.data;
//   } catch (error: any) {
//     console.error("Error:", error);
//     return error.response?.data || { message: "Something went wrong" };
//   }
// };

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
  // console.log(data);
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
