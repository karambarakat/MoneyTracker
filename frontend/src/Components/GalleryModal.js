import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Modal from "@material-ui/core/Modal";

const GalleryModal = ({ children }) => {
  const [modal, handleClose] = useLogic();

  return (
    <Modal style={{ top: 100 }} open={modal} onClose={handleClose}>
      {children}
    </Modal>
  );
};

const useLogic = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const modalBoolian = useSelector((state) => state.GalleryModal);
  const handleClose = () => {
    dispatch({ type: "gallery/close" });
    history.goBack();
  };
  return [modalBoolian.open, handleClose];
};

export default GalleryModal;
