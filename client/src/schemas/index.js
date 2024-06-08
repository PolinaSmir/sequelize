import * as yup from "yup";

export const USER_SCHEMA = yup.object({
  firstName: yup.string().required().min(2).max(30),
  lastName: yup.string().required().min(2).max(30),
  email: yup.string().required().email(),
  password: yup
    .string()
    .required()
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/),
  birthday: yup.date().required().max(new Date(), "Birthday must be today or earlier"),
  gender: yup.string().required(),
});
