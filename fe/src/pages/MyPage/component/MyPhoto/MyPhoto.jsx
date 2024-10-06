import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const MyPhoto = ({ photo }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* 클릭 가능한 이미지 */}
      <img
        src={photo.image}
        style={{ width: "100%", cursor: "pointer", marginBottom: "10px" }}
        onClick={handleShow}
      />

      {/* 모달 창 */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <img
            src={photo.image}
            alt={photo.description}
            style={{ width: "100%" }}
          />
          <p>{photo.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MyPhoto;
