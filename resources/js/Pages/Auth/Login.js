import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });
    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };
    return (_jsxs(GuestLayout, { children: [_jsx(Head, { title: "Log in" }), status && _jsx("div", { className: "mb-4 font-medium text-sm text-green-600", children: status }), _jsxs("form", { onSubmit: submit, children: [_jsxs("div", { children: [_jsx(InputLabel, { htmlFor: "email", value: "Email" }), _jsx(TextInput, { id: "email", type: "email", name: "email", value: data.email, className: "mt-1 block w-full", autoComplete: "username", isFocused: true, onChange: (e) => setData('email', e.target.value) }), _jsx(InputError, { message: errors.email, className: "mt-2" })] }), _jsxs("div", { className: "mt-4", children: [_jsx(InputLabel, { htmlFor: "password", value: "Password" }), _jsx(TextInput, { id: "password", type: "password", name: "password", value: data.password, className: "mt-1 block w-full", autoComplete: "current-password", onChange: (e) => setData('password', e.target.value) }), _jsx(InputError, { message: errors.password, className: "mt-2" })] }), _jsx("div", { className: "block mt-4", children: _jsxs("label", { className: "flex items-center", children: [_jsx(Checkbox, { name: "remember", checked: data.remember, onChange: (e) => setData('remember', e.target.checked) }), _jsx("span", { className: "ms-2 text-sm text-gray-600", children: "Remember me" })] }) }), _jsxs("div", { className: "flex items-center justify-end mt-4", children: [canResetPassword && (_jsx(Link, { href: route('password.request'), className: "underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", children: "Forgot your password?" })), _jsx(PrimaryButton, { className: "ms-4", disabled: processing, children: "Log in" })] })] })] }));
}
