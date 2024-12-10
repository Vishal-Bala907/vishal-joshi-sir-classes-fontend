import React, { useEffect, useState } from "react";
import { Card, Progress } from "reactstrap";

interface Insights {
  testsByType: {
    completed?: Record<string, number>;
    total?: Record<string, number>;
  };
}

const TestProgress = ({ insights, progress }: { insights: Insights, progress: any }) => {
  const [progressData, setProgressData] = useState({
    completed: 0,
    unattempted: 0,
    total: 0,
  });

  useEffect(() => {
    if (insights?.testsByType) {
      const completedTests = Object.values(insights.testsByType.completed || {}).reduce(
        (sum, value) => sum + value,
        0
      );

      const totalTests = Object.values(insights.testsByType.total || {}).reduce(
        (sum, value) => sum + value,
        0
      );

      const unattemptedTests = totalTests - completedTests;

      setProgressData({
        completed: completedTests,
        unattempted: unattemptedTests,
        total: totalTests,
      });
    }
  }, [insights]);

  const { completed, unattempted, total } = progressData;
  const completedPercentage = total ? ((progress?.scores?.length || 0) / total) * 100 : 0;
  const unattemptedPercentage = total ? (unattempted / total) * 100 : 0;

  return (
    <Card>
      <div className="p-2">
        <h5 className="text-center">Test Progress</h5>
        <Progress multi>
          <Progress
            bar
            striped
            animated
            color="primary"
            value={completedPercentage}
            title={`Completed: ${progress?.scores?.length}`}
          >
            {`Completed (${progress?.scores?.length})`}
          </Progress>
          <Progress
            bar
            color="secondary"
            value={unattemptedPercentage}
            title={`Unattempted: ${unattempted}`}
          >
            {`Unattempted (${unattempted})`}
          </Progress>
        </Progress>
        <div className="text-center mt-2">
          <strong>Total Tests:</strong> {total}
        </div>
      </div>
    </Card>
  );
};

export default TestProgress;
