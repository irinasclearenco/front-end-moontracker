import {ErrorMessages, FormRules, SignInForm, SignUpForm} from './interfaces';

export const errorMessages: ErrorMessages = {
  email: {required: 'Email is required', pattern: 'This field must contain an email'},
  password: {
    required: 'Password is required',
    minLength: 'This field must contain at least 8 symbols',
  },
  confirmPassword: {
    required: 'Password is required',
    minLength: 'This field must contain at least 8 symbols',
  },
};
export const formRules: FormRules = {
  email: {required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/},
  password: {
    required: true,
    minLength: 8,
  },
  confirmPassword: {
    required: true,
    minLength: 8,
  },
};
export const signInForm: SignInForm[] = [
  {placeholder: 'Enter your email', type: 'email'},
  {placeholder: 'Enter your password', type: 'password'},
];
export const signUpForm: SignUpForm[] = [
  {placeholder: 'Enter your email', type: 'email'},
  {placeholder: 'Enter password', type: 'password'},
  {placeholder: 'Confirm password', type: 'confirmPassword'},
];
