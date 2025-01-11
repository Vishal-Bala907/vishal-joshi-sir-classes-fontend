"use client";
import { Breadcrumb, BreadcrumbItem, Col, Container, Row } from "reactstrap";
import Link from "next/link";
import { PropsTypes } from "@/Types/LayoutTypes";

const Breadcrumbs: React.FC<PropsTypes> = ({ mainTitle, parent, title }) => {
  return (
    <Container fluid>
      <Row className="page-title">
        <Col sm="6">
          <h2>{mainTitle}</h2>
          {title && <p className="mb-0 text-title-gray">{title}</p>}
        </Col>
        <Col sm="6">
          <Breadcrumb className="justify-content-sm-end align-items-center">
            <BreadcrumbItem>
              <Link href={`/dashboard`}>
                <i className="iconly-Home icli svg-color" />
              </Link>
            </BreadcrumbItem>
            {parent && <BreadcrumbItem>{parent}</BreadcrumbItem>}
            <BreadcrumbItem className="active">{mainTitle}</BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
    </Container>
  );
};

export default Breadcrumbs;
