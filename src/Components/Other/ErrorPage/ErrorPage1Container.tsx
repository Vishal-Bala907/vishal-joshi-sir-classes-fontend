import { Error1 } from "@/Data/Pages/PagesSvgIcons";
import CommonErrorPage from "./Common/CommonErrorPage";

const ErrorPage1Container = () => {
  return <CommonErrorPage title="Page Not Found" errorIcon={<Error1 />} />;
};
export default ErrorPage1Container;
