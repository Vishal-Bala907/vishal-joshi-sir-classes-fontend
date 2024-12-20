import { createTest } from "@/server/tests";
import React, { useState } from "react";
import {
  Button,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

// Define types for Question and Option
export interface Option {
  option: string;
  isCorrect: boolean;
  image_url?: string;
}

export interface Question {
  question: string;
  subject: string;
  difficulty?: string;
  formula?: string;
  image_url?: string;
  options: Option[];
}

export interface Test {
  name: string;
  description: string;
  test_type: string;
  questions: Question[];
  students?: [string];
  _id?: any;
}

export interface Errors {
  name: string;
  description: string;
  questions: string[];
}

export const difficultyOptions = [
  { name: "Easy" },
  { name: "Medium" },
  { name: "Hard" },
];

export const subjectOptions = [
  { name: "Physics" },
  { name: "Chemistry" },
  { name: "Maths" },
];

const CreateTest = ({ type, setReload }: { type: string; setReload: any }) => {
  const [testCreate, setTestCreate] = useState(false);
  // alert("Create test");

  const [test, setTest] = useState<Test>({
    name: "",
    description: "",
    test_type: type,
    questions: [],
  });

  // Explicitly define the errors type
  const [errors, setErrors] = useState<Errors>({
    name: "",
    description: "",
    questions: [],
  });

  const handleCreateTest = async () => {
    let isValid = true;
    let validationErrors: Errors = { name: "", description: "", questions: [] };

    if (test.name.trim() === "") {
      validationErrors.name = "Test Title is required.";
      isValid = false;
    }

    if (test.questions.length === 0) {
      validationErrors.questions.push("There must be at least one question.");
      isValid = false;
    }

    test.questions.forEach((question, questionIndex) => {
      if (question.question.trim() === "") {
        validationErrors.questions.push(
          `Question ${questionIndex + 1} must have valid text.`
        );
        isValid = false;
      }

      if (question.options.length === 0) {
        validationErrors.questions.push(
          `Question ${questionIndex + 1} must have at least one option.`
        );
        isValid = false;
      }

      let hasTrueOption = false;
      question.options.forEach((option, optionIndex) => {
        if (option.option.trim() === "") {
          validationErrors.questions.push(
            `Option ${optionIndex + 1} of Question ${
              questionIndex + 1
            } must not be empty.`
          );
          isValid = false;
        }

        if (option.isCorrect) {
          hasTrueOption = true;
        }
      });

      if (!hasTrueOption) {
        validationErrors.questions.push(
          `Question ${
            questionIndex + 1
          } must have at least one option marked as the correct answer.`
        );
        isValid = false;
      }
    });
    setErrors(validationErrors);
    if (!isValid) {
      return;
    }

    try {
      const response = await createTest(test);
      if (response.status == "success") {
        setReload((prev: number) => prev + 1);
        handleCancel();
      }
    } catch (error) {
      console.error("Failed to create test:", error);
    }
  };

  const handleCancel = () => {
    setErrors({
      name: "",
      description: "",
      questions: [],
    });
    setTest({
      name: "",
      description: "",
      test_type: type,
      questions: [],
    });
    setTestCreate(false);
  };

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "end" }}
        className="mr-4 mb-2"
      >
        {/* <Button color="primary" onClick={() => setTestCreate(true)}>
          Create New
        </Button> */}
      </div>
      <Modal isOpen={testCreate}>
        <ModalHeader>
          <h4>Create New {type} Test</h4>
        </ModalHeader>
        <ModalBody>
          <InputGroup
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Input
              placeholder="Test Title *"
              title="Title"
              style={{ width: "100%", marginBottom: "5px" }}
              value={test.name}
              onChange={(e) => setTest({ ...test, name: e.target.value })}
              required
            />
            {errors.name && (
              <div style={{ color: "red", marginTop: "5px" }}>
                {errors.name}
              </div>
            )}
          </InputGroup>
          <InputGroup
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Input
              placeholder="Test Description"
              title="Description"
              style={{ width: "100%", marginBottom: "5px" }}
              value={test.description}
              onChange={(e) =>
                setTest({ ...test, description: e.target.value })
              }
              required
            />
            {errors.description && (
              <div style={{ color: "red", marginTop: "5px" }}>
                {errors.description}
              </div>
            )}
          </InputGroup>
          <div>Questions:</div>
          {test.questions.length > 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                overflowY: "auto",
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              {test.questions.map((question, index) => (
                <div
                  key={index}
                  style={{ width: "100%", marginBottom: "10px" }}
                >
                  <Input
                    placeholder={`Question ${index + 1}`}
                    title="Question"
                    style={{ width: "100%", marginBottom: "5px" }}
                    value={question.question}
                    onChange={(e) => {
                      setTest({
                        ...test,
                        questions: test.questions.map((q, i) =>
                          i === index ? { ...q, question: e.target.value } : q
                        ),
                      });
                    }}
                    required
                  />
                  {errors.questions
                    .filter(
                      (error) =>
                        error == `Question ${index + 1} must have valid text.`
                    )
                    .map((error, i) => (
                      <div key={i} style={{ color: "red", marginTop: "5px" }}>
                        {error}
                      </div>
                    ))}
                  <div className="d-flex">
                    <select
                      value={question.subject}
                      onChange={(e) => {
                        setTest({
                          ...test,
                          questions: test.questions.map((q, i) =>
                            i === index ? { ...q, subject: e.target.value } : q
                          ),
                        });
                      }}
                    >
                      {subjectOptions.map((subject) => (
                        <option key={subject.name} value={subject.name}>
                          {subject.name.toUpperCase()}
                        </option>
                      ))}
                    </select>
                    <select
                      value={question.difficulty}
                      onChange={(e) => {
                        setTest({
                          ...test,
                          questions: test.questions.map((q, i) =>
                            i === index
                              ? { ...q, difficulty: e.target.value }
                              : q
                          ),
                        });
                      }}
                    >
                      {difficultyOptions.map((difficult) => (
                        <option key={difficult.name} value={difficult.name}>
                          {difficult.name.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Input
                          placeholder={`Option ${optionIndex + 1}`}
                          title="Option"
                          style={{ width: "100%", marginBottom: "5px" }}
                          value={option.option}
                          onChange={(e) => {
                            setTest({
                              ...test,
                              questions: test.questions.map((q, i) =>
                                i === index
                                  ? {
                                      ...q,
                                      options: q.options.map((o, i2) =>
                                        i2 === optionIndex
                                          ? { ...o, option: e.target.value }
                                          : o
                                      ),
                                    }
                                  : q
                              ),
                            });
                          }}
                          required
                        />
                        <div
                          style={{
                            width: "20%",
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <Input
                            type="checkbox"
                            checked={option.isCorrect}
                            onChange={(e) => {
                              setTest({
                                ...test,
                                questions: test.questions.map((q, i) =>
                                  i === index
                                    ? {
                                        ...q,
                                        options: q.options.map((o, i2) =>
                                          i2 === optionIndex
                                            ? {
                                                ...o,
                                                isCorrect: e.target.checked,
                                              }
                                            : { ...o, isCorrect: false }
                                        ),
                                      }
                                    : q
                                ),
                              });
                            }}
                          />
                        </div>
                      </div>
                      {errors.questions
                        .filter((error) =>
                          error.includes(
                            `Option ${optionIndex + 1} of Question ${index + 1}`
                          )
                        )
                        .map((error, i) => (
                          <div
                            key={i}
                            style={{ color: "red", marginTop: "5px" }}
                          >
                            {error}
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* Add Question Button */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <Button
              color="primary"
              onClick={() => {
                setTest({
                  ...test,
                  questions: [
                    ...test.questions,
                    {
                      question: "",
                      subject: subjectOptions[0].name,
                      formula: "",
                      difficulty: difficultyOptions[0].name,
                      options: [
                        { option: "", isCorrect: false },
                        { option: "", isCorrect: false },
                        { option: "", isCorrect: false },
                        { option: "", isCorrect: false },
                      ],
                    },
                  ],
                });
              }}
            >
              Add Question
            </Button>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => handleCancel()}>Cancel</Button>
          <Button color="primary" onClick={handleCreateTest}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default CreateTest;
