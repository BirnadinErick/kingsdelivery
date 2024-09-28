import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Button } from "@/primitives/ui/button";
import { CheckCircle } from "lucide-react";
import alertOctagon from "@/lib/alertOctagon.json";
import Lottie from "lottie-react";
import { useEffect } from "react";
export default function CuisineOrders({ auth, cuisine, orders }) {
    useEffect(() => {
        const intId = setInterval(() => {
            console.log('refresh');
            window.location.reload();
        }, 1000 * import.meta.env.VITE_ORDER_REFRESH_INT);
        return () => clearInterval(intId);
    }, []);
    return (_jsxs(AuthenticatedLayout, { user: auth.user, header: _jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Current Orders" }), children: [_jsx(Head, { title: cuisine.name + " Orders | King's Delivery" }), _jsx("div", { className: "py-12", children: _jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-3 gap-12", children: orders.map((o, idx) => _jsx("div", { children: _jsxs("div", { className: "bg-white p-4 rounded-sm space-y-4 shadow-lg", children: [_jsxs("p", { className: "font-bold", children: ["Order#: ", _jsx("span", { children: o.id })] }), _jsxs("div", { className: "flex justify-start items-center space-x-1", children: [_jsx("div", { className: "size-8", children: _jsx(Lottie, { animationData: alertOctagon }) }), _jsxs("p", { children: ["Prepare before: ", o.deadline, " "] })] }), _jsxs("div", { children: [_jsx("p", { children: "Prepare:" }), _jsx("ul", { className: "list-disc px-8", children: o.items.map((i, idx) => _jsxs("li", { children: [i.product.name, " - ", i.label] }, idx)) })] }), _jsx("p", { children: "Assigned driver name: Birnadin E." }), _jsxs(Button, { className: "space-x-2", variant: "default", children: [_jsx(CheckCircle, { className: "size-4" }), " ", _jsx("span", { children: " Mark as Ready" })] })] }) }, idx)) }) })] }));
}
