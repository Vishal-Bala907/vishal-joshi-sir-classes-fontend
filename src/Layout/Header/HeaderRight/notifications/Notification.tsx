import React, { useEffect, useState } from "react";
import style from "./notifications.module.css";
import { GiCancel } from "react-icons/gi";
import { getAllTodaysSession } from "@/server/sessions";
import { Card, Button } from "react-bootstrap";

interface NotificationProps {
  setNotification: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Notification {
  date: string;
  status: string;
  time: string;
  title: string;
  _id: string;
}

const Notification: React.FC<NotificationProps> = ({ setNotification }) => {
  // State to hold notifications
  const [notifications, setNotifications] = useState<Notification[] | null>(
    null
  );

  useEffect(() => {
    getAllTodaysSession()
      .then((data) => {
        setNotifications(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div
      className={`${style.notification} bg-body-secondary px-4 rounded-3`}
      style={{
        height: "38em",
        overflow: "scroll",
        boxShadow: "6px 8px 30px #00000063",
      }}
    >
      <div>
        <GiCancel
          onClick={() => {
            setNotification(false);
          }}
          style={{
            color: "black",
            borderRadius: "50%",
            outline: "none",
            border: "1px solid #f9f7f6",
            fill: "black",
            cursor: "pointer",
          }}
        />
      </div>

      <div
        className=" py-3 rounded-3 h-100"
        style={
          {
            // height: "50%",
          }
        }
      >
        {notifications ? (
          notifications.map((notification) => {
            // Format the date and time for better display
            const formattedDate = new Date(
              notification.date
            ).toLocaleDateString();
            const formattedTime = new Date(
              notification.date
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <Card key={notification._id} className="mb-3">
                <Card.Body>
                  <Card.Title>{notification.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {formattedDate} at {formattedTime}
                  </Card.Subtitle>
                  {/* <Card.Text>
                    Status: <strong>{notification.status}</strong>
                  </Card.Text> */}
                  {/* <Button variant="primary" className="me-2">
                    Start Session
                  </Button>
                  <Button variant="danger">Cancel Session</Button> */}
                </Card.Body>
              </Card>
            );
          })
        ) : (
          <p>Loading notifications...</p>
        )}
      </div>
    </div>
  );
};

export default Notification;