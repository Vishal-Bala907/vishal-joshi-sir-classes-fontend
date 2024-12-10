import React from 'react'
import { Card, CardHeader, Table } from 'reactstrap'

const PreviousTests = ({ tests }: any) => {
    return (
        <Card>
            <CardHeader>Previous Tests</CardHeader>
            <Table striped bordered responsive >
                <thead>
                    <tr>
                        <th>Test Name</th>
                        <th>Test Date</th>
                        <th>Test Result</th>
                    </tr>
                </thead>
                <tbody style={{ height: '60px', overflowY: 'scroll' }}>
                    {tests.map((test: any, index: number) => {
                        const time = new Date(test.dateTaken)
                        const date = `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`

                        return (
                            <tr key={index}>
                                <td>{test?.test?.name ?? ''}</td>
                                <td>{date}</td>
                                <td>{test.correctCount}/{test.totalQuestions}</td>
                            </tr>
                        )
                    }).reverse()}
                </tbody>
            </Table>
        </Card>
    )
}

export default PreviousTests