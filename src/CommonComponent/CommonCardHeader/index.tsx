import React, { Fragment } from "react";
import { CardHeader } from "reactstrap";

interface SpanType {
  text?: string;
  code?: string;
  mark?: string;
}

export interface CommonCardHeaderProp {
  title: string;
  span?: SpanType[];
  headClass?: string;
  icon?: JSX.Element;
  tagClass?: string;
}

const CommonCardHeader: React.FC<CommonCardHeaderProp> = ({ title, span, headClass, icon, tagClass }) => {
  return (
    <CardHeader className={`card-no-border pb-0 ${headClass ? headClass : ""}`}>
      <h3 className={tagClass ? tagClass : ""}>
        {icon && icon}
        {title}
      </h3>
      {span && ( 
        <p className="mt-1 mb-0">
          {span.map((data, index) => (
            <Fragment key={index}> 
              {data?.text} {data.code && <code>{data.code}</code>} {data.mark && <mark>{data.mark}</mark>}
            </Fragment>
          ))}
        </p>
      )}
    </CardHeader>
  );
};

export default CommonCardHeader;
