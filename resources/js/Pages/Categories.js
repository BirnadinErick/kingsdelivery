import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import { Button } from "@/primitives/ui/button";
export default function Cuisines({ cuisines, categories }) {
    return _jsxs(_Fragment, { children: [_jsx(Head, { title: "Categories" }), _jsx(Layout, { cuisines: cuisines, categories: categories, children: _jsxs("section", { className: "px-24", children: [_jsx("h2", { className: "text-2xl font-bold font-serif", children: "Categories We Have So Far" }), _jsx("div", { className: "my-4 space-x-4", children: categories.map((c, idx) => _jsx(Button, { asChild: true, children: _jsx(Link, { href: `/categories/${c.category_id}`, children: c.name }, idx) })) })] }) })] });
}
