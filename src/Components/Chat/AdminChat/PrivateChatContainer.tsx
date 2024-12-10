"use client";
import { useAppDispatch } from "@/Redux/Hooks";
import { useEffect } from "react";
import { Container, Row } from "reactstrap";
import { LeftSideBar } from "./LeftSideBar";
import UserChat from "./UserChat";
import { useSelector } from "react-redux";
import { fetchChatApiData, fetchChatMemberApiData } from "@/Redux/Reducers/ChatSlice";

const PrivateChatContainer = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: any) => state.user)


  useEffect(() => {
    dispatch(fetchChatMemberApiData());
    dispatch(fetchChatApiData());
  }, []);

  return (
    <>
      <Container fluid>
        <Row className="g-0">
          {
            user.role == "admin" &&
            <LeftSideBar />
          }
          <UserChat />
        </Row>
      </Container>
    </>
  );
};

export default PrivateChatContainer;
