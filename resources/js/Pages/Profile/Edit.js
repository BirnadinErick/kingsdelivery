import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
export default function Edit({ auth, mustVerifyEmail, status }) {
    return (_jsxs(AuthenticatedLayout, { user: auth.user, header: _jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Profile" }), children: [_jsx(Head, { title: "Profile" }), _jsx("div", { className: "py-12", children: _jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6", children: [_jsx("div", { className: "p-4 sm:p-8 bg-white shadow sm:rounded-lg", children: _jsx(UpdateProfileInformationForm, { mustVerifyEmail: mustVerifyEmail, status: status, className: "max-w-xl" }) }), _jsx("div", { className: "p-4 sm:p-8 bg-white shadow sm:rounded-lg", children: _jsx(UpdatePasswordForm, { className: "max-w-xl" }) }), _jsx("div", { className: "p-4 sm:p-8 bg-white shadow sm:rounded-lg", children: _jsx(DeleteUserForm, { className: "max-w-xl" }) })] }) })] }));
}
