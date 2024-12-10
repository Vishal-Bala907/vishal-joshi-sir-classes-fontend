import { Fragment } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";

export const UpcomingClassesData = [
    {
        day: "15 November",
        data: [
            { time: "09:00", color: "primary", text: "GDM 2nd semester", title: "Physics introduction" },
        ],
    },
    {
        day: "17 November",
        data: [
            { time: "12:00", color: "primary", text: "GDM 2nd semester", title: "Physics Base building" },
        ],
    },
];

const UpcomingClassesCommon = () => {
    return (
        <Card>
            <CardHeader>Upcoming Sessions</CardHeader>
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
    );
};

export default UpcomingClassesCommon;
