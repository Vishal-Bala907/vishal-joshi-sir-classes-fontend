import React, { useState } from 'react'
import { Question, Test } from './CreateTest'
import { Card, CardBody, CardTitle, Row, Col } from 'reactstrap'
import './TestQuestionList.css'  // Assuming you'll add styles here

// Component for the individual clickable box with question number
const QuestionClickableBox = ({ question, number, isSelected, onClick }: { question: Question, number: number, isSelected: boolean, onClick: () => void }) => {
    return (
        <Col xs="12" sm="6" md="4" lg="3" className="mb-3">
            <div
                className={`question-box p-3 rounded shadow-sm text-center ${isSelected ? 'selected' : ''}`}
                onClick={onClick}
            >
                <div className="question-number font-weight-bold">{number}</div>
                <div className="question-text text-muted">{question.subject}</div>
            </div>
        </Col>
    )
}

// Component for the list of questions in the test
const TestQuestionList = ({ test, selectedQuestions, setSelectedQuestions }: { test: Test, selectedQuestions: number, setSelectedQuestions: any }) => {

    return (
        <Card className="my-4" style={{ maxHeight: '60vh', overflowY: 'scroll' }}>
            <CardBody>
                <CardTitle tag="h5" className="text-center mb-4">Test Questions</CardTitle>
                <Row>
                    {test?.questions?.map((question, index) => (
                        <QuestionClickableBox
                            key={index}
                            question={question}
                            number={index + 1}
                            isSelected={selectedQuestions == index}
                            onClick={() => setSelectedQuestions(index)}
                        />
                    ))}
                </Row>
            </CardBody>
        </Card>
    )
}

export default TestQuestionList
