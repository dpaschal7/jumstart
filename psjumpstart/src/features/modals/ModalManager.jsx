import React from "react";
import { connect } from "react-redux";
import TestModal from "./TestModal";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
const modalLookup = {
  TestModal,
  RegisterModal,
  LoginModal
};

const mapState = state => ({
  currentModal: state.modals
});

const ModalManager = ({ currentModal }) => {
  let renderedModal;
  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];

    renderedModal = <ModalComponent {...modalProps} />;
  }
  return <span>{renderedModal}</span>;
};

export default connect(mapState)(ModalManager);
