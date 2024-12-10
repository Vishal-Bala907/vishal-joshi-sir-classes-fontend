import ConfigDB from "@/Config/ThemeConfig";
import { useAppSelector } from "@/Redux/Hooks";
import { ConfigurationProp } from "@/Types/LayoutTypes";
import React, { Fragment } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { Button, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";

const ConfigurationClass: React.FC<ConfigurationProp> = ({ modalToggle, modal }) => {
  const { layout_type, sideBarIconType } = useAppSelector((state) => state.themeCustomizer);
  const handleThemeCopy = () => toast.success("Code Copied to clipboard !", { position: "bottom-right", autoClose: 3000, closeOnClick: true, theme: "light" });
  const configDB = ConfigDB;
  return (
    <Fragment>
      <Modal isOpen={modal} toggle={modalToggle} className="modal-body" centered={true}>
        <ModalHeader toggle={modalToggle}>{"Configuration"}</ModalHeader>
        <ModalBody>
          <Container fluid={true} className="bd-example-row">
            <Row>
              <p>{"To replace our design with your desired theme. Please do configuration as mention"}</p>
              <p><b> {"Path : src > config > ThemeConfig.tsx "}</b></p>
            </Row>
            <pre>
              <code>
                <div> {"export const ConfigDB ="}&#123;</div>
                <div>   {"settings"}&#58; &#123;</div>
                <div>     {"layout_type"}&#58; '{layout_type}',</div>
                <div>     {"layout_class"}&#58; '{ConfigDB.settings.layout_class}',</div>
                <div>     {"sidebar"}&#58; &#123;</div>
                <div>       {"type"}&#58; '{ConfigDB.settings.sidebar.type}',</div>
                <div>       {"iconType"}&#58; '{sideBarIconType}',</div>
                <div>     &#125;,</div>
                <div>     {"sidebar_setting"}&#58; '{ConfigDB.settings.sidebar_setting}',</div>
                <div>   &#125;,</div>
                <div>   {"color"}&#58; &#123;</div>
                <div>     {"primary_color"}&#58; '{ConfigDB.color.primary_color}',</div>
                <div>     {"secondary_color"}&#58; '{ConfigDB.color.secondary_color}',</div>
                <div>     {"mix_background_layout"}&#58; '{ConfigDB.color.mix_background_layout}',</div>
                <div>   &#125;,</div>
                <div>   {"router_animation"}&#58; '{ConfigDB.router_animation}'</div>
                <div> &#125;</div>
              </code>
            </pre>
          </Container>
        </ModalBody>
        <ModalFooter>
          <CopyToClipboard text={JSON.stringify(configDB)}>
            <Button color="primary" className="notification" onClick={handleThemeCopy}>{"Copy text"}</Button>
          </CopyToClipboard>
          <Button color="secondary" onClick={modalToggle}>{"Cancel"}</Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};
export default ConfigurationClass;
