import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const GroupCardModal = (props) => {
  const { selectedGroup, setIsModalOpen, isModalOpen } = props;
  return (
    <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} style={customStyles}>
      {selectedGroup && (
        <div>
          <img src={`http://localhost:5000/${selectedGroup.imagePath}`} alt={`${selectedGroup.name}`} />
          <h1>{selectedGroup.name}</h1>
          <p>Description: {selectedGroup.description}</p>
          <p>Created at: {selectedGroup.createdAt}</p>
          <p>Updated at: {selectedGroup.updatedAt}</p>

          <button onClick={() => setIsModalOpen(false)}>Close</button>
        </div>
      )}
    </Modal>
  );
};

export default GroupCardModal;
