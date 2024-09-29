import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
//@ts-nocheck
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Button } from "@/primitives/ui/button";
const AddressDisplay = ({ jsonString }) => {
    const jsonObject = JSON.parse(jsonString);
    const { line1, line2, postal_code, city } = jsonObject;
    return (_jsxs("span", { className: "pl-4 block", children: [line1, line2 ? `, ${line2}` : '', ", ", postal_code, ", ", city] }));
};
export default function DriverDeliver({ auth, deliveries }) {
    return (_jsxs(AuthenticatedLayout, { user: auth.user, header: _jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Available Orders" }), children: [_jsx(Head, { title: "Deliver | King's Flavour" }), _jsx("div", { className: "py-4:", children: _jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8  grid grid-cols-1 gap-y-2 lg:gap-y-0 lg:grid-cols-3 lg:gap-12", children: deliveries.map((d, idx) => _jsxs("div", { className: "bg-white p-4 rounded-sm space-y-4 shadow-lg", children: [_jsxs("p", { className: "font-bold", children: ["Delivery#: ", _jsx("span", { children: d.id })] }), _jsxs("div", { children: [_jsx("p", { children: "Stops:" }), _jsx("ul", { className: "list-disc px-8", children: d.stops.map((i, idx) => _jsxs("li", { children: [i.name, " ", _jsxs("span", { className: "font-bold", children: ["#", i.order_id] })] }, idx)) })] }), _jsxs("div", { children: [_jsx("span", { children: "Destination:" }), _jsx(AddressDisplay, { jsonString: d.address_text })] }), _jsx(Button, { asChild: true, className: "space-x-2", variant: "default", children: _jsx(Link, { href: `/b2b/deliver-request/${d.id}`, children: "Request" }) })] }, idx)) }) })] }));
}
