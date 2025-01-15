"use client";
import { stopStudySession } from "@/server/user";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CameraView from "../slider/CameraView";

// Styled components for a modern, lighter theme
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f0f4f8, #e5eaf1);
  font-family: "Poppins", sans-serif;
  color: #333;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #555;
`;

const Dropdown = styled.select`
  padding: 10px;
  font-size: 1rem;
  margin: 10px 0;
  background: #ffffff;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  cursor: pointer;

  option {
    background: #ffffff;
  }
`;

const Display = styled.div`
  font-size: 2.5rem;
  margin: 20px 0;
  letter-spacing: 2px;
  color: #444;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 0;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  width: 80px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #ffffff;
  color: #333;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  background: #007bff;
  color: #fff;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #0056b3;
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }
`;

const DataContainer = styled.div`
  margin-top: 20px;
  font-size: 1rem;
  background: #f9f9f9;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: #555;
`;

const StopwatchTimer: React.FC = () => {
  const [subject, setSubject] = useState<string>("");
  const [isStopwatch, setIsStopwatch] = useState(true);
  const [time, setTime] = useState(0); // Time in milliseconds
  const [countdown, setCountdown] = useState(0); // Timer in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [sessionData, setSessionData] = useState<any | null>(null);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTime = useRef<Date | null>(null);
  const endTime = useRef<Date | null>(null);
  const [isTrue, setTrue] = useState(false);

  useEffect(() => {
    let start: number;

    if (isRunning && !isPaused) {
      start = performance.now();

      intervalRef.current = setInterval(() => {
        const elapsed = performance.now() - start;
        setTime(elapsed);

        if (!isStopwatch && countdown > 0) {
          setCountdown((prev) => prev - elapsed);
        }
      }, 100); // Update every 100ms
    } else {
      clearInterval(intervalRef.current!);
    }

    return () => clearInterval(intervalRef.current!);
  }, [isRunning, isPaused, isStopwatch, countdown]);

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleStart = () => {
    setTrue(true);
    if (!subject) {
      alert("Please select a subject first!");
      return;
    }
    if (!isStopwatch) {
      setCountdown(hours * 3600000 + minutes * 60000); // Convert hours and minutes to milliseconds
    }
    setIsRunning(true);
    setIsPaused(false);
    startTime.current = new Date();
  };

  const handlePause = () => {
    setIsPaused((prev) => !prev);
  };

  const user = useSelector((state: any) => state.user);
  const handleStop = () => {
    setTrue(false);
    setIsRunning(false);
    setIsPaused(false);
    endTime.current = new Date();

    // Calculate duration in minutes
    const duration = Math.round((time / 60000) * 100) / 100; // Duration in minutes with 2 decimal places

    const session = {
      userId: user._id,
      subject: subject,
      startTime: startTime.current?.toLocaleTimeString(),
      endTime: endTime.current?.toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
      duration: duration,
    };

    stopStudySession(session)
      .then((data) => {
        setSessionData(session);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const reset = () => {
    setTime(0);
    setCountdown(0);
    setIsRunning(false);
    setIsPaused(false);
    setSessionData(null);
    setHours(0);
    setMinutes(0);
  };

  return (
    <Container>
      {/* <Title>Modern Stopwatch & Timer</Title> */}
      <Dropdown onChange={(e) => setSubject(e.target.value)} value={subject}>
        <option value="">Select Subject</option>
        <option value="Physics">Physics</option>
        <option value="Chemistry">Chemistry</option>
        <option value="Maths">Maths</option>
        <option value="Biology">Biology</option>
      </Dropdown>
      {isTrue && <CameraView />}
      <Display>
        {isStopwatch ? formatTime(time) : formatTime(countdown)}
      </Display>
      {!isStopwatch && (
        <InputGroup>
          <Input
            type="number"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            placeholder="Hours"
          />
          <Input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            placeholder="Minutes"
          />
        </InputGroup>
      )}
      <ButtonGroup
        style={{
          margin: "15px 0px",
        }}
      >
        <Button onClick={handleStart} disabled={isRunning && !isPaused}>
          Start
        </Button>
        <Button onClick={handlePause} disabled={!isRunning}>
          {isPaused ? "Resume" : "Pause"}
        </Button>
        <Button onClick={handleStop} disabled={!isRunning}>
          Stop
        </Button>
        <Button onClick={reset}>Reset</Button>
      </ButtonGroup>

      {sessionData && (
        <DataContainer>
          <strong>Session Data:</strong>
          <div>Subject: {sessionData.subject}</div>
          <div>Start Time: {sessionData.startTime}</div>
          <div>End Time: {sessionData.endTime}</div>
          <div>Date: {sessionData.date}</div>
          <div>Duration: {sessionData.duration} minutes</div>
        </DataContainer>
      )}
    </Container>
  );
};

export default StopwatchTimer;
