import React, { Fragment } from 'react'
import { Card, CardBody, CardHeader } from 'reactstrap'
import { UpcomingClassesData } from '../Dashboard/UpcomingSession'

const SessionList = () => {
    return (
        <Card>
            <CardHeader>Session List</CardHeader>
            <CardBody className="upcoming-class pt-0">
                {UpcomingClassesData.map((item, index) => (
                    <Fragment key={index}>
                        <div className="activity-day">
                            <h6>{item.day}</h6>
                        </div>
                        <ul>
                            {item.data.map((data, index) => (
                                <li className="d-flex align-items-center gap-2" key={index}>
                                    <div className="flex-shrink-0">
                                        <h5>{data.time}</h5>
                                    </div>
                                    <div className={`flex-grow-1 border-2 b-l-${data.color} p-1`}>
                                        <h6>{data.text}</h6>
                                        <p>{data.title}</p>
                                    </div>
                                    <i className={`fa fa-circle circle-dot-${data.color} pull-right`} />
                                </li>
                            ))}
                        </ul>
                    </Fragment>
                ))}
            </CardBody>
        </Card>
    )
}

export default SessionList