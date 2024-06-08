import React from "react";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { USER_SCHEMA } from "../../schemas";

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
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  birthday: "",
  gender: "",
};

const AddUserFormModal = (props) => {
  const handleSubmitToFormik = (values, actions) => {
    console.log(values);
    actions.resetForm();
  };

  return (
    <Modal isOpen={props.isModalOpen} onRequestClose={() => props.setIsModalOpen(false)} style={customStyles}>
      <h1>Type information about user</h1>

      <Formik initialValues={initialState} onSubmit={handleSubmitToFormik} validationSchema={USER_SCHEMA}>
        {(formikProps) => {
          return (
            <Form style={{ display: "flex", flexDirection: "column" }}>
              <Field name="firstName" placeholder="John" />
              <ErrorMessage name="firstName" component="p" />
              <Field name="lastName" placeholder="Madden" />
              <ErrorMessage name="lastName" component="p" />
              <Field name="email" placeholder="johnmadden@example.com" />
              <ErrorMessage name="email" component="p" />
              <Field name="password" type="password" placeholder="gr3at@3wdsG" />
              <ErrorMessage name="password" component="p" />
              <Field name="birthday" type="date" />
              <ErrorMessage name="birthday" component="p" />
              <Field name="gender" placeholder="Input your gender" />
              <ErrorMessage name="gender" component="p" />
              <button type="submit">Add user</button>
            </Form>
          );
        }}
      </Formik>

      <button onClick={() => props.setIsModalOpen(false)}>Close</button>
    </Modal>
  );
};

export default AddUserFormModal;
