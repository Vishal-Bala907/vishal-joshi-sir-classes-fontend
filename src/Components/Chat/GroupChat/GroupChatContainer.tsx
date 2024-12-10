'use client'
import Breadcrumbs from "@/CommonComponent/Breadcrumbs";
import { Chats, GroupChat } from "@/Constant";
import { Container, Row } from "reactstrap";
import { useEffect } from "react";
import { useAppDispatch } from "@/Redux/Hooks";
import UserGroupChat from "./UserGroupChat";
import { LeftSideBar } from "../AdminChat/LeftSideBar";
import { fetchChatApiData, fetchChatMemberApiData } from "@/Redux/Reducers/ChatSlice";


const GroupChatContainer = () => {

    const dispatch = useAppDispatch()
  
    useEffect(() => {
      dispatch(fetchChatMemberApiData());
      dispatch(fetchChatApiData());
    }, []);

    return (
        <>
            <Breadcrumbs mainTitle={GroupChat} parent={Chats} />
            <Container fluid>
                <Row className="g-0">
                    <LeftSideBar />
                    <UserGroupChat />
                </Row>
            </Container>
        </>
    );
};

export default GroupChatContainer;
