import * as Yup from 'yup';

export interface LoginFormData {
    name?: string;
    email: string;
    password: string;
    passwordMatcher?: string;
}

export const validationScheme = Yup.object().shape({
    email: Yup.string().trim().email('Invalid email').required('Email is required'),
    password: Yup.string().trim().min(8, 'Password must have at least 8 characters').required('Password is required'),
    passwordMatcher: Yup.string().trim().oneOf([Yup.ref('password')], 'Passwords must match')
});

export const initialValues: LoginFormData = {
    name: '',
    email: '',
    password: '',
    passwordMatcher: ''
};