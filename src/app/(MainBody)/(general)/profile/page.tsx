"use client"
import BasicInfo from '@/Components/Profile/BasicInfo'
import React from 'react'
import { Col, Row } from 'reactstrap'

const page = () => {
    return (
        <>
            <div className='mt-3'>
                <Row>
                    <Col sm="12" md="12" lg="4" >
                        <BasicInfo />
                    </Col>
                    <Col sm="12" md="12" lg="8" ></Col>
                </Row>
            </div>
        </>
    )
}

export default page