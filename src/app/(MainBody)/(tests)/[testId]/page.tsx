"use client"
import { Test } from '@/Components/Test/CreateTest'
import TestAnalysis from '@/Components/Test/TestAnalysis'
import TestView from '@/Components/Test/TestView'
import { getMyProgress } from '@/server/progress'
import { getSingleTest, submitTest, updateTest } from '@/server/tests'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useParams } from 'next/navigation'
import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Card, Col } from 'reactstrap'

const page = () => {
  const { testId } = useParams();
  const user = useSelector((state: any) => state.user)
  const [data, setData] = useState<any>({})
  const [test, setTest] = useState<Test>({
    name: '',
    description: '',
    test_type: '',
    questions: [],
  })
  const [testReplica, setTestReplica] = useState<Test>({
    name: '',
    description: '',
    test_type: '',
    questions: [],
  })

  const [editable, setEditable] = useState(false);
  const [answers, setAnswers] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const [submitted, setSubmitted] = useState<any>(false);
  const [questionTime, setQuestionTime] = useState<number[]>([])
  const [isTestUpdated, setIsTestUpdated] = useState(false);
  const [defaultSubmitted, setDefaultSubmitted] = useState<any>(false);
  const [testBegin, setTestBegin] = useState(new Date().getTime())

  const getSingleTestFunc = async () => {
    const res = await getSingleTest(String(testId));
    setTest(res)
    updateDefaultAnswers(res)
  }

  useEffect(() => {
    if (test._id && user._id) {
      if (test?.students?.includes(user._id)) {
        if (user?.progressId) {
          getMyProgress(user.progressId).then((res: any) => {
            const test = res.progress.testResults.find((result: any) => result?.test?._id == testId)
            setData(test)
          })
            .catch((err) => { console.log(err) })
            .finally(() => {
              setDefaultSubmitted(true)
            })
        }
      }
    }
  }, [user, test])

  const handleTestSubmit = async () => {
    const submissionTime = new Date().getTime();
    const timeTaken = submissionTime - testBegin
    setLoading(true)
    const { data } = await submitTest({
      testId,
      answers,
      userId: user._id,
      progressId: user?.progressId ?? '',
      timeTaken,
      questionTime
    });
    setData(data.validationResult);
    setSubmitted(true);
    setLoading(false)
  }

  const handleTestUpdate = async () => {
    updateTest(String(testId), test)
      .then((res) => {
        setTestReplica(test)
        setEditable(false);
        setIsTestUpdated(false);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const updateDefaultAnswers = (test: Test) => {
    if (test.name) {
      let baseAnswers = []
      let time = []
      for (let i = 0; i < test.questions.length; i++) {
        baseAnswers.push(false);
        time.push(0)
      }
      setQuestionTime(time)
      setAnswers(baseAnswers)
    }
  }

  useEffect(() => {
    getSingleTestFunc();
  }, [])

  return (
    <div>
      <Fragment>
        <Col lg="12" md="12" sm="12" className="order-xxl-0 order-xl-2 box-col-6">
          {
            defaultSubmitted ?
              <TestAnalysis testName={test.name} test={test} result={data} /> :
              submitted ?
                <TestAnalysis testName={test.name} test={test} result={data} />
                :
                <>
                  {
                    (user.role == "admin" || user.role == "mentor") &&
                    <div className='d-flex justify-content-end p-1'>
                      {
                        editable ?
                          <Button onClick={() => { setEditable(false); setTest(testReplica); }}>Cancel</Button>
                          :
                          <Button onClick={() => setEditable(true)}>Edit</Button>
                      }
                    </div>
                  }
                  <TestView
                    test={test}
                    setTest={setTest}
                    editable={editable}
                    setIsTestUpdated={setIsTestUpdated}
                    answers={answers}
                    setAnswers={setAnswers}
                    testBegin={testBegin}
                    questionTime={questionTime}
                    setQuestionTime={setQuestionTime}
                  />
                  {
                    isTestUpdated && user.role == "admin" && <div className='d-flex justify-content-end p-2'>
                      <Button
                        color='warning'
                        className='m-1'
                        onClick={() => {
                          setTest(testReplica);
                        }}>Reset</Button>
                      <Button color='primary'
                        onClick={() => handleTestUpdate()}
                      >Update</Button>
                    </div>
                  }
                </>
          }
          {
            !submitted && !defaultSubmitted && (user.role !== "admin" && user.role !== "mentor") &&
            <div className='d-flex justify-content-end p-1'>
              {
                loading ?
                  <div className="d-flex justify-content-center">
                    <div className="loader">
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                  :
                  <Button color='primary' onClick={() => handleTestSubmit()}>Submit</Button>
              }
            </div>
          }
        </Col>
      </Fragment>
    </div>
  )
}

export default page