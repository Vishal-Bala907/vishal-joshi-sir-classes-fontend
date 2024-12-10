import { Error2 } from "@/Data/Pages/PagesSvgIcons";
import CommonErrorPage from "./Common/CommonErrorPage";

const ErrorPage2Container = () => {
  return <CommonErrorPage title="Oops! This Page is Not Found." errorIcon={<Error2 />} />;
};
export default ErrorPage2Container;
