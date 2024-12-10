import React, { useEffect, useState } from 'react'

const TestTimer = ({ testBegin }: { testBegin: number }) => {
    const [timeTaken, setTimeTaken] = useState<any>(0)

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeTaken(Date.now() - testBegin)
        }, 1000)
        return () => clearInterval(intervalId)
    }, [testBegin])
    return (
        <div className='d-flex justify-content-end'>
            <h3> {Math.floor(timeTaken / 1000)} s</h3>
        </div>
    )
}

export default TestTimer