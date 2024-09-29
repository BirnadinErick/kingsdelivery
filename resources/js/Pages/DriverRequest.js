import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
//@ts-nocheck
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/primitives/ui/accordion";
import { useEffect, useState } from "react";
import { Button } from "@/primitives/ui/button";
const AddressDisplay = ({ jsonString }) => {
    const jsonObject = JSON.parse(jsonString);
    const { line1, line2, postal_code, city } = jsonObject;
    return (_jsxs("span", { className: "pl-1 block", children: [line1, line2 ? `, ${line2}` : '', ", ", postal_code, ", ", city] }));
};
const Section = ({ children }) => {
    return _jsxs("section", { className: "px-4 mt-4 mb-8", children: [" ", children, " "] });
};
const openGoogleMapsDirections = (driverLocation, destination, stops) => {
    const origin = `${driverLocation.lat},${driverLocation.lng}`;
    const dest = `${destination.lat},${destination.lng}`;
    const waypoints = stops.map(stop => `${stop.lat},${stop.lng}`).join("|");
    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${dest}&waypoints=${waypoints}&travelmode=driving`;
};
const constructUserAddress = (address) => {
    return { lat: 0, lng: 0 };
};
export default function DriverRequest({ auth, delivery }) {
    const [driverLoc, setDriverLoc] = useState({ lat: 0, lng: 0 });
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setDriverLoc({ lat: position.coords.latitude, lng: position.coords.longitude });
        });
    }, []);
    return (_jsxs(AuthenticatedLayout, { user: auth.user, header: _jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Current Delivery" }), children: [_jsx(Head, { title: "Deliver | King's Flavour" }), _jsxs(Section, { children: [_jsxs("p", { children: ["Delivery ", _jsxs("span", { className: "font-bold", children: ["#", delivery.id] })] }), _jsxs("p", { children: ["Deadline: ", delivery.deadline] })] }), _jsxs(Section, { children: [_jsx("h2", { className: "text-2xl", children: "Stops" }), _jsx("ul", { children: delivery.stops.map((s, idx) => _jsx("li", { children: _jsxs("div", { children: [_jsx("p", {}), _jsx("div", { children: _jsx(Accordion, { type: "single", collapsible: true, children: _jsxs(AccordionItem, { value: "item-1", children: [_jsx(AccordionTrigger, { children: _jsxs("p", { children: [s.name, " - ", _jsxs("span", { className: "font-bold", children: ["#", s.order_id] })] }) }), _jsx(AccordionContent, { children: _jsx("ul", { className: "list-decimal px-8", children: s.items.map((i, idx) => _jsxs("li", { children: [i.name, " ", i.label] }, idx)) }) })] }) }) })] }) }, idx)) })] }), _jsxs(Section, { children: [_jsx("h2", { className: "text-2xl", children: "Customer Details" }), _jsxs("div", { className: "space-y-2 mt-2", children: [_jsxs("p", { children: ["Name: ", delivery.customer.name] }), _jsxs("p", { children: ["Telephone: ", _jsx("a", { className: "text-blue-400 underline underline-offset-4", href: `tel:${delivery.customer.telephone}`, children: delivery.customer.telephone })] }), _jsxs("div", { className: "flex justify-start items-baseline", children: [_jsx("p", { children: "Address: " }), _jsx(AddressDisplay, { jsonString: delivery.customer.address })] }), _jsx(Button, { asChild: true, variant: "default", children: _jsx("a", { target: "_blank", href: openGoogleMapsDirections(driverLoc, delivery.customer.coords, delivery.stops.map(s => s.location)), children: "Start Directions" }) })] })] }), _jsxs(Section, { children: [_jsx("h2", { className: "text-2xl", children: "Actions" }), _jsxs("div", { className: "flex justify-start items-baseline space-x-4 mt-2", children: [_jsx(Button, { variant: "outline", children: "Fulfill Delivery" }), _jsx(Button, { variant: "destructive", children: "Abort Delivery" })] })] })] }));
}
