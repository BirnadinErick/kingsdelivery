import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
export default function Guest({ children }) {
    return (_jsxs("div", { className: "min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100", children: [_jsx("div", { children: _jsx(Link, { href: "/", children: _jsx(ApplicationLogo, { className: "w-20 h-20 fill-current text-gray-500" }) }) }), _jsx("div", { className: "w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg", children: children })] }));
}
