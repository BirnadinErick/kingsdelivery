import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import CustomerHeader from "@/Components/CustomerHeader";
export default function Layout({ categories, cuisines, children }) {
    return (_jsxs(_Fragment, { children: [_jsx(CustomerHeader, { cuisines: cuisines, categories: categories }), _jsx("main", { children: children }), _jsxs("footer", { className: "px-4 lg:px-24 py-4 bg-slate-200", children: [_jsx("h2", { className: "text-2xl font-bold font-serif", children: "Kings Delivery" }), _jsxs("div", { className: "my-4 space-y-2", children: [_jsx("p", { children: "Address" }), _jsx("p", { children: "Telephone" })] }), _jsx("div", { className: "my-4 space-y-2", children: "\u00A9 All Rights Reserved by Walton Fernando." })] })] }));
}
