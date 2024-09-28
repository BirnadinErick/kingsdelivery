import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
//@ts-nocheck
import { Head } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import { Button } from "@/primitives/ui/button";
import { Badge } from "@/primitives/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/primitives/ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/primitives/ui/drawer";
import { ShoppingCart } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/primitives/ui/toggle-group";
export default function Products({ cuisines, categories, products }) {
    return _jsxs(_Fragment, { children: [_jsx(Head, { title: "Products" }), _jsx(Layout, { cuisines: cuisines, categories: categories, children: _jsxs("section", { className: "px-24", children: [_jsx("h2", { className: "text-2xl font-bold font-serif", children: "Products we offer" }), _jsx("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-12 my-3", children: products.map((op, idx) => {
                                if (op.variations === undefined || op.variations === null || op.variations === '') {
                                    op.variations = JSON.stringify({
                                        values: [
                                            { label: "Normal", optionPrice: 0 }
                                        ]
                                    });
                                }
                                console.log(op);
                                const variations = JSON.parse(op.variations);
                                return _jsxs("div", { children: [_jsx("img", { className: "rounded-sm", src: op.image, alt: op.name }), _jsxs("div", { className: "mt-3 flex justify-start items-baseline space-x-2", children: [_jsx("p", { className: "font-bold", children: op.name }), _jsx(Badge, { variant: "solid", className: "bg-sky-200 py-1 px-4", children: op.category.name })] }), _jsx("p", { className: "text-slate-800 mt-1 truncate", children: op.description }), _jsxs(Dialog, { children: [_jsx(DialogTrigger, { className: "text-sky-800 cursor-pointer", children: "Read More Description..." }), _jsx(DialogContent, { children: _jsxs(DialogHeader, { children: [_jsx(DialogTitle, { className: "font-bold mb-4", children: op.name }), _jsxs(DialogDescription, { className: "space-y-4", children: [_jsx("img", { src: op.image, alt: op.name }), _jsx("span", { className: "block", children: op.description })] })] }) })] }), _jsx("div", { className: "mt-3", children: _jsxs(Drawer, { children: [_jsx(DrawerTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", className: "bg-black text-white", children: [_jsx(ShoppingCart, { className: "mr-2 h-4 w-4" }), "Add to Cart \u00A3 ", op.price] }) }), _jsx(DrawerContent, { variant: "solid", className: "bg-gray-950 text-slate-50", children: _jsxs("div", { className: "mx-auto w-full max-w-lg", children: [_jsxs(DrawerHeader, { children: [_jsx(DrawerTitle, { children: "Choose the Variant." }), _jsx(DrawerDescription, { children: "Select any one of our varying option" }), _jsx("div", { children: _jsx("img", { src: op.image, alt: op.name, className: "rounded-sm" }) })] }), _jsxs(DrawerFooter, { children: [_jsx("p", { className: "text-gray-300", children: "Upgrade your order for a fraction of a cost..." }), _jsx(ToggleGroup, { type: "single", variant: "solid", children: variations.values.map((v, idx) => _jsxs(ToggleGroupItem, { className: "hover:text-black", value: v.label, "aria-label": v.label, children: [v.label, " + \u00A3 ", v.optionPrice] }, idx)) }), _jsx(Button, { children: "Add to Cart" }), _jsx(DrawerClose, { children: _jsx(Button, { variant: "outline", className: "w-full text-black", children: "Cancel" }) })] })] }) })] }) })] }, idx);
                            }) })] }) })] });
}
