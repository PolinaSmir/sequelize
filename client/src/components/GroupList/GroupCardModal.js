import React from "react";
import Modal from "react-modal";
import { createGroupImage } from "../../api";
import { Formik, Form } from "formik";

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
  const { selectedGroup, setIsModalOpen, isModalOpen, loadGroups } = props;
  return (
    <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} style={customStyles}>
      {selectedGroup && (
        <div>
          <img src={`http://localhost:5000/${selectedGroup.imagePath}`} alt={`${selectedGroup.name}`} />
          <div>Set new img:</div>
          <Formik
            initialValues={{ groupAvatar: [] }}
            onSubmit={async (values, actions) => {
              const { setSubmitting } = actions;
              // console.log(values);

              const formData = new FormData();
              values.groupAvatar.forEach((currentFile) => {
                formData.append("groupAvatar", currentFile);
              });

              try {
                const serverResponse = await createGroupImage(formData, selectedGroup.id);
                console.log(serverResponse);
                setIsModalOpen(false);
                await loadGroups();
              } catch (error) {
                console.error(error);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form>
                <input
                  type="file"
                  name="groupAvatar"
                  accept="image/*"
                  onChange={(event) => {
                    const files = [...event.target.files];
                    setFieldValue("groupAvatar", files);
                  }}
                />
                <button type="submit" disabled={isSubmitting}>
                  Upload image
                </button>
              </Form>
            )}
          </Formik>
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
