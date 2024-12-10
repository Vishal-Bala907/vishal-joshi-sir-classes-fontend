import { getSingleTest } from "@/server/tests";
import { Test } from "../CreateTest";

export const handleTestQuestionDownload = async (testId: string) => {
  const res: Test = await getSingleTest(String(testId));

  const customHtmlContent = `
  <div style="font-family: Arial, sans-serif; padding: 20px;">
  <div style="display:flex; justify-content:center;align-items:center">
  <div>
    <img src='/assets/images/favicon.ico' alt='logo' width="50" height="50" />
  </div>
  <h2 style="color:#308e87;font-weight:bold">VJ Sir Mentorship</h2>
  </div>
    <h1>${res.name}</h1>
    <p><strong>Description:</strong> ${
      res.description || "No description available"
    }</p>

    <h2>Questions</h2>
    <ol>
      ${res.questions
        .map(
          (question, qIndex) => `
        <li style="margin-bottom: 20px;">
          <h3>Question ${qIndex + 1}: ${question.question}</h3>
          <p><strong>Subject:</strong> ${question.subject}</p>
          <ul>
            ${question.options
              .map(
                (option, oIndex) => `
              <li style="margin-left: 20px;">
                ${oIndex + 1}) ${option.option}
              </li>
            `
              )
              .join("")}
          </ul>
        </li>
      `
        )
        .join("")}
    </ol>
  </div>
`;

  const html2pdf = (await import("html2pdf.js/dist/html2pdf.js")).default;
  const pdfOptions = {
    margin: 10,
    filename: `${res.name}-test_paper.pdf`,
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };
  await html2pdf().from(customHtmlContent).set(pdfOptions).save();
  return true;
};
