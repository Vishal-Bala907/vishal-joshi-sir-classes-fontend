import React, { useEffect, useState } from 'react'
import { Question, Test } from './CreateTest'
import { Card, CardBody, CardTitle, CardText, ListGroup, ListGroupItem, Button, Row, Col } from 'reactstrap'
import './TestQuestionView.css'  // Assuming you'll add some custom styles

const TestQuestionView = ({
    test,
    selectedQuestions,
    setSelectedQuestions,
    answers,
    setAnswers,
    questionTime,
    setQuestionTime
}: {
    test: Test,
    selectedQuestions: number,
    setSelectedQuestions: any
    answers: any,
    setAnswers: any,
    questionTime: number[],
    setQuestionTime: any
}) => {
    const [selectedQuestionDetails, setSelectedQuestionDetails] = useState<Question>({
        question: "",
        subject: "",
        difficulty: "",
        formula: "",
        image_url: "",
        options: []
    });

    useEffect(() => {
        setSelectedQuestionDetails(test.questions[selectedQuestions]);
    }, [selectedQuestions, test.questions]);

    const handleNextQuestion = () => {
        if (selectedQuestions < test.questions.length - 1) {
            setSelectedQuestions(selectedQuestions + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (selectedQuestions > 0) {
            setSelectedQuestions(selectedQuestions - 1);
        }
    };

    const handleAnswerSelection = (index: number) => {
        const updatedAnswers = [...answers];
        updatedAnswers[selectedQuestions] = index;
        setAnswers(updatedAnswers);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setQuestionTime((prevTime: number[]) => {
                const newTime = [...prevTime]; // Create a shallow copy of the previous time array
                newTime[selectedQuestions] += 1; // Increment the selected question index
                return newTime; // Return the updated state
            });
        }, 1000);

        // Clean up the interval when the component unmounts or when dependencies change
        return () => clearInterval(intervalId);
    }, [selectedQuestions]);

    return (
        <Card className="my-4">
            <CardBody>
                <CardTitle tag="h5" className="text-center">{selectedQuestionDetails?.subject}</CardTitle>
                <CardText className="text-muted text-center">{selectedQuestionDetails?.difficulty}</CardText>

                {/* Question Text */}
                <div className="question-text">
                    <h5>{selectedQuestionDetails?.question}</h5>
                </div>

                {/* Formula Display */}
                {selectedQuestionDetails?.formula && (
                    <div className="formula-section mt-3">
                        <strong>Formula:</strong>
                        <p>{selectedQuestionDetails.formula}</p>
                    </div>
                )}

                {/* Image Display */}
                {selectedQuestionDetails?.image_url && (
                    <div className="image-section mt-3">
                        <img src={selectedQuestionDetails.image_url} alt="Question Visual" className="img-fluid" />
                    </div>
                )}

                {/* Options */}
                <ListGroup className="mt-4">
                    {selectedQuestionDetails?.options.map((option, index) => (
                        <ListGroupItem
                            key={index}
                            action
                            className={answers[selectedQuestions] === index ? 'selected-answer mt-1' : 'mt-1'}
                            onClick={() => handleAnswerSelection(index)}
                        >
                            {option.option}
                        </ListGroupItem>
                    ))}
                </ListGroup>

                {/* Navigation Buttons */}
                <Row className="mt-4">
                    <Col className="d-flex justify-content-between">
                        <Button color="secondary" onClick={handlePreviousQuestion} disabled={selectedQuestions === 0}>
                            Previous
                        </Button>
                        <Button color="primary" onClick={handleNextQuestion} disabled={selectedQuestions === test.questions.length - 1}>
                            Next
                        </Button>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};

export default TestQuestionView;
