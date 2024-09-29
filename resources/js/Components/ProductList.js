import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
//@ts-nocheck
import { Badge } from "@/primitives/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/primitives/ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/primitives/ui/drawer";
import { Button } from "@/primitives/ui/button";
import { ShoppingCart } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/primitives/ui/toggle-group";
import { addItemToCart } from "@/lib/cartSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
export default function ProductList({ products }) {
    const [currVariation, setVariation] = useState(-1);
    const dispatch = useDispatch();
    function addToCart(product) {
        let variation;
        if (currVariation !== -1) {
            variation = product.variations.filter(p => p.id === currVariation)[0];
        }
        else {
            variation = product.variations[0];
        }
        let cartProduct = {
            id: product.product_id,
            price: parseFloat(variation.price),
            quantity: 1,
            totalPrice: parseFloat(variation.price),
            name: product.name,
            label: variation.label,
            pid: variation.price_id
        };
        dispatch(addItemToCart(cartProduct));
        setVariation(-1);
    }
    return _jsx("div", { className: "grid grid-cols-1 lg:grid-cols-3 lg:gap-x-8 gap-y-12 my-3", children: products.map((op, idx) => _jsxs("div", { children: [_jsx("img", { className: "rounded-sm", src: op.image, alt: op.name }), _jsxs("div", { className: "mt-3 flex justify-start items-baseline space-x-2", children: [_jsx("p", { className: "font-bold", children: op.name }), _jsx(Badge, { variant: "solid", className: "bg-sky-200 py-1 px-4", children: op.category.name })] }), _jsx("p", { className: "text-slate-800 mt-1 truncate", children: op.description }), _jsxs(Dialog, { children: [_jsx(DialogTrigger, { className: "text-sky-800 cursor-pointer", children: "Read More Description..." }), _jsx(DialogContent, { children: _jsxs(DialogHeader, { children: [_jsx(DialogTitle, { className: "font-bold mb-4", children: op.name }), _jsxs(DialogDescription, { className: "space-y-4", children: [_jsx("img", { src: op.image, alt: op.name }), _jsx("span", { className: "block", children: op.description })] })] }) })] }), _jsx("div", { className: "mt-3", children: _jsxs(Drawer, { children: [_jsx(DrawerTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", className: "bg-black text-white", children: [_jsx(ShoppingCart, { className: "mr-2 h-4 w-4" }), "Add to Cart \u00A3 ", op.price] }) }), _jsx(DrawerContent, { variant: "solid", className: "bg-gray-950 text-slate-50", children: _jsxs("div", { className: "mx-auto w-full max-w-lg", children: [_jsxs(DrawerHeader, { children: [_jsx(DrawerTitle, { children: "Choose the Variant." }), _jsx(DrawerDescription, { children: "Select any one of our varying option" }), _jsx("div", { children: _jsx("img", { src: op.image, alt: op.name, className: "rounded-sm" }) })] }), _jsxs(DrawerFooter, { children: [_jsx("p", { className: "text-gray-300", children: "Upgrade your order for a fraction of a cost..." }), _jsx(ToggleGroup, { type: "single", variant: "solid", defaultValue: op.variations[0].id, onValueChange: (id) => {
                                                        setVariation(id);
                                                    }, children: op.variations.map((v, idx) => _jsxs(ToggleGroupItem, { className: "hover:text-black", value: v.id, "aria-label": v.label, children: [v.label, " - \u00A3 ", v.price] }, idx)) }), _jsxs(DrawerClose, { children: [_jsx(Button, { className: "w-full mb-3", onClick: () => addToCart(op), children: "Add to Cart" }), _jsx(Button, { variant: "outline", className: "w-full text-black", children: "Cancel" })] })] })] }) })] }) })] }, idx)) });
}
