import { CommonErrorPageProps } from "@/Types/PagesType";
import Link from "next/link";
import React from "react";
import { Col, Container } from "reactstrap";

const CommonErrorPage: React.FC<CommonErrorPageProps> = ({ errorIcon, title }) => {
  return (
    <div className="page-wrapper compact-wrapper" id="pageWrapper">
      <div className="error-wrapper">
        <Container>
          <div className="svg-wrraper">{errorIcon}</div>
          <Col md="8" className="offset-md-2">
            <h3>{title}</h3>
            <p className="sub-content">{"The page you are attempting to reach is currently not available. This may be because the page does not exist or has been moved."}</p>
            <Link href={`/dashboard/default`} className="btn btn-primary">
              {"BACK TO HOME PAGE"}
            </Link>
          </Col>
        </Container>
      </div>
    </div>
  );
};

export default CommonErrorPage;
