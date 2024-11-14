import {FunctionComponent} from 'react';

export interface Tab {
  name: string;
  Component: FunctionComponent<{
    navigation: any;
    googleError: string;
    googleIsPending: boolean;
    promptAsync: (config: any) => Promise<any>;
    selectedIndex: number;
  }>;
}
export interface ErrorMessages {
  email: {required: string; pattern: string};
  password: {required: string; minLength: string};
  confirmPassword?: {required: string; minLength: string};
}
export interface FormRules {
  email: {required: boolean; pattern: RegExp};
  password: {
    required: boolean;
    minLength: number;
  };
  confirmPassword?: {
    required: boolean;
    minLength: number;
  };
}
export interface SignInForm {
  placeholder: string;
  type: 'email' | 'password';
}
export interface SignUpForm {
  placeholder: string;
  type: 'email' | 'password' | 'confirmPassword';
}
