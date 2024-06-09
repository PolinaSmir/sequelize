import React from "react";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { GROUP_SCHEMA } from "../../schemas";
import { createGroup } from "../../api";

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

const initialState = {
  name: "",
  description: "",
};

const AddGroupFormModal = (props) => {
  const handleSubmitToFormik = async (values, actions) => {
    const serverResponse = await createGroup(values);
    console.log(serverResponse); // pripojeny group, jaky se vrati z bd
    props.setIsModalOpen(false);
    await props.loadGroups();
    actions.resetForm();
  };

  return (
    <Modal isOpen={props.isModalOpen} onRequestClose={() => props.setIsModalOpen(false)} style={customStyles}>
      <h1>Type information about group</h1>

      <Formik initialValues={initialState} onSubmit={handleSubmitToFormik} validationSchema={GROUP_SCHEMA}>
        {(formikProps) => {
          return (
            <Form style={{ display: "flex", flexDirection: "column" }}>
              <Field name="name" placeholder="Funny dogs" />
              <ErrorMessage name="name" component="p" />
              <Field name="description" placeholder="This is a group for dogs" />
              <ErrorMessage name="description" component="p" />
              <button type="submit">Add group</button>
            </Form>
          );
        }}
      </Formik>

      <button onClick={() => props.setIsModalOpen(false)}>Close</button>
    </Modal>
  );
};

export default AddGroupFormModal;
