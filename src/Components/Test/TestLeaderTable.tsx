import { getTestLeaderBoard } from '@/server/tests'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Table } from 'reactstrap'

const TestLeaderTable = ({ selectedTestLeaderBoardId }: any) => {

    const [leaderBoardData, setLeaderBoardData] = useState<any>([])

    const getLeaderBoardResult = (selectedTestLeaderBoardId: any) => {
        getTestLeaderBoard(selectedTestLeaderBoardId).then((res: any) => {
            setLeaderBoardData(res.leaderboard.entries)
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        if (selectedTestLeaderBoardId) {
            getLeaderBoardResult(selectedTestLeaderBoardId);
        }
    }, [selectedTestLeaderBoardId])

    return (
        <Card>
            <CardHeader>LeaderBoard</CardHeader>
            <CardBody>
                <Table striped bordered responsive >
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            leaderBoardData.map((entries: any, index: number) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{entries.rank}</th>
                                        <td>{entries.studentId.name}</td>
                                        <td>{entries.score.toFixed(2)}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    )
}

export default TestLeaderTable