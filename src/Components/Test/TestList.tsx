import { deleteTest, getTestByType } from "@/server/tests";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { useSelector } from "react-redux";
import { handleTestQuestionDownload } from "./helper/test";
import TestLeaderTable from "./TestLeaderTable";
// import Loading from "@/app/loading";

const TestList = ({ type, reload }: { type: string; reload: number }) => {
  const router = useRouter();
  const [tests, setTests] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const user = useSelector((state: any) => state.user);
  const [downloading, setDownloading] = useState<any>(Math.random());
  const [selectedTestLeaderBoardId, setSelectedLeaderBoardId] =
    useState<any>(false);

  const getTestByTypeFunc = async () => {
    const response = await getTestByType(type);
    setTests(response.data.tests ?? []);
    setLoading(false);
  };

  const handleTestDelete = async (testId: string) => {
    await deleteTest(testId);
    getTestByType();
  };

  useEffect(() => {
    if (type) {
      getTestByTypeFunc();
    }
  }, [type, reload]);

  return (
    <Row>
      list of all live tests
      <Col
        xxl={selectedTestLeaderBoardId ? "8" : "12"}
        xl={selectedTestLeaderBoardId ? "8" : "12"}
        lg={selectedTestLeaderBoardId ? "8" : "12"}
        md="12"
        sm="12"
        className="order-xxl-0 order-xl-2 box-col-6"
      >
        <Card>
          <CardHeader>{type} List</CardHeader>
          <CardBody className="upcoming-class pt-0">
            {loading ? (
              <div className="d-flex justify-content-center">
                <div className="loader">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            ) : (
              tests?.map((test: any, index: number) => (
                <Fragment key={index}>
                  <li className="d-flex align-items-center gap-2" key={index}>
                    <div className="flex-shrink-0">
                      <h6>{test.count}</h6>
                    </div>
                    <div
                      className={`flex-grow-1 border-2 b-l-success p-1`}
                      style={{ cursor: "pointer" }}
                    >
                      <p onClick={() => router.push(`/${test._id}`)}>
                        {test.name}
                      </p>
                    </div>
                    {selectedTestLeaderBoardId == test._id ? (
                      <div
                        onClick={() => {
                          setSelectedLeaderBoardId(false);
                        }}
                      >
                        <Icon icon="ic:round-close" width="24" height="24" />
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          setSelectedLeaderBoardId(test._id);
                        }}
                      >
                        <Icon
                          icon="material-symbols:leaderboard-rounded"
                          width="24"
                          height="24"
                        />
                      </div>
                    )}
                    {downloading == index ? (
                      <div>
                        <Icon
                          icon="eos-icons:three-dots-loading"
                          width="24"
                          height="24"
                        />
                      </div>
                    ) : (
                      <div
                        className={`p-1`}
                        style={{ cursor: "pointer" }}
                        onClick={async () => {
                          setDownloading(index);
                          handleTestQuestionDownload(test._id).finally(() => {
                            setDownloading(Math.random());
                          });
                        }}
                      >
                        <Icon
                          icon="material-symbols:download-2-rounded"
                          width="24"
                          height="24"
                        />
                      </div>
                    )}
                    {user.role == "admin" && (
                      <div
                        onClick={() => handleTestDelete(test._id)}
                        style={{ cursor: "pointer" }}
                      >
                        <Icon icon="ic:round-delete" width="24" height="24" />
                      </div>
                    )}
                  </li>
                </Fragment>
              ))
            )}
          </CardBody>
        </Card>
      </Col>
      {selectedTestLeaderBoardId && (
        <Col
          xxl="4"
          xl="4"
          lg="4"
          md="12"
          sm="12"
          className="order-xxl-0 order-xl-2 box-col-6"
        >
          <TestLeaderTable
            selectedTestLeaderBoardId={selectedTestLeaderBoardId}
          />
        </Col>
      )}
    </Row>
  );
};

export default TestList;
