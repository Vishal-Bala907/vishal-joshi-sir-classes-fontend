import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Button, Card, CardBody, Col, Row, Table } from 'reactstrap';
import Image from 'next/image';
import { Test } from './CreateTest';
import { ApexOptions } from 'apexcharts';

// Dynamically import ApexCharts for server-side compatibility with Next.js
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface InsightProps {
    text: string;
    score: string;
}

export const OverViewCards: React.FC<InsightProps> = ({ text, score }) => (
    <Col sm="6" md="3" className="mb-3">
        <Card>
            <CardBody>
                <h5 style={{ fontWeight: 'bold' }} className="text-secondary">{text}</h5>
                <h6 className="text-primary">{score}</h6>
            </CardBody>
        </Card>
    </Col>
);

interface TestAnalysisProps {
    testName: string;
    test: Test;
    result: any
}

const TestAnalysis: React.FC<TestAnalysisProps> = ({ testName, test, result }) => {
    const downloadPdf = async () => {
        const html2pdf = (await import('html2pdf.js/dist/html2pdf.js')).default;
        const element = document.getElementById('insights');
        const pdfOptions = {
            margin: 10,
            filename: `${testName}.pdf`,
            image: { type: 'jpeg', quality: 1 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        };
        html2pdf().from(element).set(pdfOptions).save();
    };

    const scoreChartData = {
        series: [
            {
                name: 'Score',
                data: result?.subjectScores?.map((s: { score: number }) => s.score),
            },
        ],
        options: {
            chart: {
                type: 'bar' as const, // Explicitly asserting the type
            },
            xaxis: {
                categories: result?.subjectScores?.map((s: { subject: string }) => s.subject),
            },
            title: {
                text: 'Subject-wise Scores',
                align: 'center' as const, // Explicitly asserting the alignment
            },
        } as ApexOptions, // Ensure the options are properly typed
    };

    const accuracyChartData = {
        series: [
            result.correctCount,
            result.wrongCount,
            result.totalQuestions - result.correctCount - result.wrongCount,
        ],
        options: {
            chart: {
                type: 'pie' as const, // Explicitly asserting the type
            },
            labels: ['Correct', 'Incorrect', 'Unattempted'],
            title: {
                text: 'Answer Accuracy',
                align: 'center' as const, // Explicitly asserting the alignment
            },
        } as ApexOptions, // Ensure the options are properly typed
    };

    const timeSpentChartData = {
        series: [{ name: 'Time Spent (min)', data: [30, 35, 25, 30] }],
        options: {
            chart: { type: 'line' as const },
            xaxis: { categories: ['Math', 'Physics', 'Chemistry', 'Biology'] },
            title: { text: 'Time Spent Per Subject', align: 'center' as const },
        },
    };

    return (
        <div style={{ width: '100%' }}>
            <div className="d-flex justify-content-end mb-3">
                <Button color="primary" onClick={downloadPdf}>
                    <Icon icon="material-symbols-light:download-2-rounded" width={24} height={24} />
                </Button>
            </div>
            <Col id="insights">
                <Card
                    style={{
                        marginTop: '30px',
                        padding: '20px',
                        borderRadius: '8px',
                        backgroundColor: '#f9f9f9',
                        border: '1px solid #ddd',
                        textAlign: 'center',
                    }}
                >
                    <div className="d-flex justify-content-center align-items-center">
                        <Image src="/assets/images/favicon.ico" alt="logo" width={50} height={50} />
                        <div>
                            <h3 className="text-primary" style={{ fontSize: '30px', fontWeight: 'bold' }}>
                                VJ Sir Mentorship
                            </h3>
                            <h4 className="text-secondary" style={{ fontSize: '20px', fontWeight: 'bold' }}>
                                {testName}
                            </h4>
                        </div>
                    </div>
                    <Row>
                        <OverViewCards text="SCORE" score={`${(result.correctCount - (result.attemptedQuestionCount - result.correctCount)) * 4}/${result.totalQuestions * 4}`} />
                        <OverViewCards text="ACCURACY" score={`${Math.round((result.correctCount / result.totalQuestions) * 100)}%`} />
                        <OverViewCards text="QS ATTEMPTED" score={`${result.attemptedQuestionCount}/${result.totalQuestions}`} />
                        <OverViewCards text="TIME TAKEN" score={`${(Number(result.timeTaken) / 3600).toFixed(2)} mins`} />
                    </Row>

                    <Row>
                        <Col sm="12" className="mb-4">
                            <Chart options={scoreChartData.options} series={scoreChartData.series} type="bar" height={300} />
                        </Col>
                        <Col sm="12" className="mb-4">
                            <Chart options={accuracyChartData.options} series={accuracyChartData.series} type="pie" height={300} />
                        </Col>
                        {/* <Col sm="12" className="mb-4">
                            <Chart options={timeSpentChartData.options} series={timeSpentChartData.series} type="line" height={300} />
                        </Col> */}
                    </Row>
                    <div>Correct Questions</div>
                    <Table striped bordered responsive>
                        <thead>
                            <tr>
                                <th>Q. No</th>
                                <th>Subject</th>
                                <th>Difficulty</th>
                                <th>Time Spent</th>
                                <th>Attempted</th>
                                <th>Answer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {test?.questions?.map((question, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{question.question}</td>
                                    <td>{question?.difficulty ?? '-'}</td>
                                    <td >{result?.userAnswers[index] != false ? `-` : '-'}</td>
                                    <td style={{ color: result?.correctAnswerIndexes?.includes(index) ? "#308e87" : '#e74b2b', fontWeight: "bold" }}>{result.attemptedQuestionIndexes.includes(index) ? 'Yes' : 'No'}</td>
                                    <td style={{ color: result?.correctAnswerIndexes?.includes(index) ? "#308e87" : '#e74b2b', fontWeight: "bold" }}>{result.correctAnswerIndexes.includes(index) ? 'Correct' : 'Wrong'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card>
            </Col>
        </div>
    );
};

export default TestAnalysis;
