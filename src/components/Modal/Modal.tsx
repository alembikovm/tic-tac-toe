import React from "react";
import ReactDOM from "react-dom";

import "./Modal.css";

const rootCls = "modal";

interface ModalProps {
  children: any;
}

class Modal extends React.Component<any, any> {
  render() {
    const { children, isModalOpen } = this.props;

    const modal = (
      <div className={rootCls}>
        <div className={`${rootCls}__inner`}>{children}</div>
      </div>
    );

    if (isModalOpen) {
      return ReactDOM.createPortal(modal, document.body);
    }

    return <></>;
  }
}

export default Modal;
