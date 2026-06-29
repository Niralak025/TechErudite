import * as Yup from 'yup';

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .matches(EMAIL_REGEX, 'Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});
