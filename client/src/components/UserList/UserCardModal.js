import React from "react";
import Modal from "react-modal";

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

const UserCardModal = (props) => {
  const { selectedUser, setIsModalOpen, isModalOpen } = props;
  return (
    <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} style={customStyles}>
      {selectedUser && (
        <div>
          <img src={`https://robohash.org/${selectedUser.firstName}-${selectedUser.lastName}?set=set4`} />
          <h1>
            {selectedUser.firstName} {selectedUser.lastName}
          </h1>
          <p>Email: {selectedUser.email}</p>
          <p>Gender: {selectedUser.gender}</p>
          <p>Birthday: {selectedUser.birthday}</p>
          <p>Created at: {selectedUser.createdAt}</p>
          <p>Updated at: {selectedUser.updatedAt}</p>

          <button onClick={() => setIsModalOpen(false)}>Close</button>
        </div>
      )}
    </Modal>
  );
};

export default UserCardModal;
