import React from "react";

import Modal from "components/Modal";

import "./WinnerModal.css";

const rootCls = "winner-modal";

const WinnerModal = ({ player, isModalOpen }: any) => {
  return (
    <Modal isModalOpen={isModalOpen}>
      <div className={rootCls}>"{player}" ПОБЕДИЛ!</div>
    </Modal>
  );
};

export default WinnerModal;
