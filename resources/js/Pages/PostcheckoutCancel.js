import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Head } from '@inertiajs/react';
import Layout from "@/Layouts/Layout";
export default function PostcheckoutCancel({ cuisines, categories }) {
    return (_jsxs(_Fragment, { children: [_jsx(Head, { title: "Post Checkout | Failed Transaction" }), _jsx(Layout, { cuisines: cuisines, categories: categories, children: _jsx("section", { className: "px-8 md:px-12 lg:px-24 xl:px-72", children: "Sorry, payment failed. Retry again." }) })] }));
}
