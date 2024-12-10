import { TabCustomizerType } from "@/Types/LayoutTypes";
import React, { useCallback, useState } from "react";
import { Button } from "reactstrap";
import ConfigurationClass from "../ConfigurationClass";

const CustomizerHeader: React.FC<TabCustomizerType> = ({ toggle }) => {
  const [modal, setModal] = useState(false);
  const modalToggle = useCallback(() => setModal(!modal), [modal]);
  return (
    <div className="customizer-header">
      <div className="theme-title">
        <div>
          <h3>{"Preview Settings"}</h3>
          <p className="mb-0">
            {"Try It Real Time "}
            <i className="fa-solid fa-thumbs-up fa-fw" />
          </p>
          <Button color="light" className="text-dark plus-popup mt-2" onClick={modalToggle}>{"Configuration"}</Button>
          <ConfigurationClass modal={modal} modalToggle={modalToggle} />
        </div>
        <div className="flex-grow-1">
          <a className="icon-btn btn-outline-light button-effect pull-right cog-close" onClick={toggle} id="cog-close">
            <i className="fa-solid fa-xmark fa-fw" />
          </a>
        </div>
      </div>
    </div>
  );
};
export default CustomizerHeader;
