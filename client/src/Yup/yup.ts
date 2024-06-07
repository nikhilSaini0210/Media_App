import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(3, 'Please enter at least 3 characters.')
        .max(50, 'Enter characters not more 50.')
        .required('Please enter your first name.'),
    lastName: Yup.string()
        .min(3, 'Please enter atleast 3 characters.')
        .max(50, 'Enter characters not more 50.')
        .required('Please enter your last name.'),
    email: Yup.string()
        .email('Please enter valid email.')
        .required('Please enter your email address.'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters.')
        .required('Please enter your password.')
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            'Must contain minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character.',
        ),
});

export const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Please enter valid email.')
        .required('Please enter your email address.'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters.')
        .required('Please enter your password.')
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            'Must contain minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character.',
        ),
});

export const ForgetPasswordSchema = Yup.object().shape({
    email: Yup.string()
        .email('Please enter valid email.')
        .required('Please enter your email address.'),
});

export const registerInitialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
};

export const loginInitialValues = {
    email: '',
    password: '',
};

export const forgetPasswordInitialValues = {
    email: '',
};