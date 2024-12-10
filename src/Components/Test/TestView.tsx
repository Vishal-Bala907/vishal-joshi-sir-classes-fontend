import React, { useEffect, useState } from 'react'
import { Button, Card, CardHeader, Col, Input, InputGroup, Row } from 'reactstrap';
import { difficultyOptions, Errors, subjectOptions, Test } from './CreateTest';
import TestQuestionList from './TestQuestionList';
import TestQuestionView from './TestQuestionView';
import TestTimer from './TestTimer';

const TestView = ({ test, setTest, editable, setIsTestUpdated, answers, setAnswers, testBegin, questionTime, setQuestionTime }:
    { test: Test, setTest: any, editable: boolean, setIsTestUpdated: any, answers: any, setAnswers: any, testBegin: number, questionTime: number[], setQuestionTime: any }) => {

    const [selectedQuestions, setSelectedQuestions] = useState<number>(0);
    const [errors, setErrors] = useState<Errors>({
        name: '',
        description: '',
        questions: [],
    });

    if (!editable) {
        return <>
            <Row>
                <TestTimer testBegin={testBegin} />
            </Row>
            <Row>
                <Col sm="12" lg="8">
                    <TestQuestionView
                        test={test}
                        selectedQuestions={selectedQuestions}
                        setSelectedQuestions={setSelectedQuestions}
                        answers={answers}
                        setAnswers={setAnswers}
                        questionTime={questionTime}
                        setQuestionTime={setQuestionTime}
                    />
                </Col>
                <Col sm="12" lg="4">
                    <TestQuestionList
                        test={test}
                        selectedQuestions={selectedQuestions}
                        setSelectedQuestions={setSelectedQuestions}
                    />
                </Col>
            </Row>
        </>
    }

    return (
        <Card>
            <CardHeader>
                <InputGroup style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    <Input
                        placeholder='Test Title *'
                        title='Title'
                        style={{ width: '100%', marginBottom: '5px' }}
                        value={test.name}
                        onChange={(e) => { setTest({ ...test, name: e.target.value }); setIsTestUpdated(true) }}
                        required
                    />
                    {errors.name && <div style={{ color: 'red', marginTop: '5px' }}>{errors.name}</div>}
                </InputGroup>
            </CardHeader>

            <InputGroup style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <Input
                    placeholder='Test Description'
                    title='Description'
                    style={{ width: '100%', marginBottom: '5px' }}
                    value={test.description}
                    onChange={(e) => { setTest({ ...test, description: e.target.value }); setIsTestUpdated(true) }}
                    required
                />
                {errors.description && <div style={{ color: 'red', marginTop: '5px' }}>{errors.description}</div>}
            </InputGroup>


            {test.questions.map((question, index) => (
                <div key={index} style={{
                    width: '100%',
                    marginBottom: '20px',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    backgroundColor: '#f9f9f9',
                }}>
                    <>
                        <Input
                            placeholder={`Question ${index + 1}`}
                            title='Question'
                            style={{ width: '100%', marginBottom: '5px' }}
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
                        {errors.questions.filter((error) => error == (`Question ${index + 1} must have valid text.`)).map((error, i) => (
                            <div key={i} style={{ color: 'red', marginTop: '5px' }}>{error}</div>
                        ))}
                        {/* <Input
                                    placeholder={`Subject`}
                                    title='Subject'
                                    style={{ width: '100%', marginBottom: '5px' }}
                                    value={question.subject}
                                    onChange={(e) => {
                                        setTest({
                                            ...test,
                                            questions: test.questions.map((q, i) =>
                                                i === index ? { ...q, subject: e.target.value } : q
                                            ),
                                        });
                                        setIsTestUpdated(true)
                                    }}
                                    required
                                /> */}
                        <div className='d-flex'>
                            <select
                                value={question.subject}
                                onChange={(e) => {
                                    setTest({
                                        ...test,
                                        questions: test.questions.map((q, i) =>
                                            i === index ? { ...q, subject: e.target.value } : q
                                        ),
                                    });
                                    setIsTestUpdated(true)
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
                                            i === index ? { ...q, difficulty: e.target.value } : q
                                        ),
                                    });
                                    setIsTestUpdated(true)
                                }}
                            >
                                {difficultyOptions.map((difficult) => (
                                    <option key={difficult.name} value={difficult.name}>
                                        {difficult.name.toUpperCase()}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </>
                    {
                        question.options.map((option, optionIndex) => (
                            <div key={optionIndex} >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Input
                                        placeholder={`Option ${optionIndex + 1}`}
                                        title='Option'
                                        style={{ width: '100%', marginBottom: '5px' }}
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
                                            setIsTestUpdated(true)
                                        }}
                                        required
                                    />
                                    <div style={{ width: '20%', display: 'flex', justifyContent: 'flex-end' }}>
                                        <Input
                                            type='checkbox'
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
                                                                        ? { ...o, isCorrect: e.target.checked }
                                                                        : { ...o, isCorrect: false }
                                                                ),
                                                            }
                                                            : q
                                                    ),
                                                });
                                                setIsTestUpdated(true)
                                            }}
                                        />
                                    </div>
                                </div>
                                {errors.questions.filter((error) => error.includes(`Option ${optionIndex + 1} of Question ${index + 1}`)).map((error, i) => (
                                    <div key={i} style={{ color: 'red', marginTop: '5px' }}>{error}</div>
                                ))}
                            </div>
                        ))
                    }
                </div>
            ))}
            {
                editable &&
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <Button
                        color="primary"
                        onClick={() => {
                            setTest({
                                ...test,
                                questions: [
                                    ...test.questions,
                                    { question: '', subject: '', options: [{ option: '', isCorrect: false }, { option: '', isCorrect: false }, { option: '', isCorrect: false }, { option: '', isCorrect: false }] },
                                ],
                            });
                        }}
                    >
                        Add Question
                    </Button>
                </div>
            }
        </Card>
    )
}

export default TestView