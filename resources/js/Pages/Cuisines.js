import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
export default function Cuisines({ cuisines, categories }) {
    return _jsxs(_Fragment, { children: [_jsx(Head, { title: "Cuisines" }), _jsx(Layout, { cuisines: cuisines, categories: categories, children: _jsxs("section", { className: "px-24", children: [_jsx("h2", { className: "text-2xl font-bold font-serif", children: "Cuisines We Have So Far" }), _jsx("div", { className: "my-4", children: cuisines.map((c, idx) => _jsx(Link, { href: `/cuisines/${c.cuisine_id}`, children: c.name }, idx)) })] }) })] });
}
