import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/primitives/ui/sheet";
import { Button } from "@/primitives/ui/button";
import { MenuIcon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/primitives/ui/accordion";
import { Link } from "@inertiajs/react";
export default function MobileNavSheet({ cuisines, categories }) {
    return _jsxs(Sheet, { children: [_jsx(SheetTrigger, { asChild: true, children: _jsx(Button, { variant: "default", size: "icon", children: _jsx(MenuIcon, { className: "h-4 w-4" }) }) }), _jsxs(SheetContent, { side: "left", children: [_jsxs(SheetHeader, { children: [_jsx(SheetTitle, { children: "Navigate the site." }), _jsx(SheetDescription, { children: "Order from our chain of cuisines as enjoy the time." })] }), _jsx("div", { children: _jsxs(Accordion, { type: "single", collapsible: true, children: [_jsxs(AccordionItem, { value: "cuisines", children: [_jsx(AccordionTrigger, { children: "Cuisines" }), _jsx(AccordionContent, { children: cuisines.map((c, idx) => _jsx(Link, { href: `/cuisines/${c.cuisine_id}`, children: _jsx("p", { className: "capitalize mb-1", children: c.name }) }, idx)) })] }), _jsxs(AccordionItem, { value: "categories", children: [_jsx(AccordionTrigger, { children: "Categories" }), _jsx(AccordionContent, { children: categories.map((c, idx) => _jsx(Link, { href: `/categories/${c.category_id}`, children: _jsx("p", { className: "mb-1 capitalize", children: c.name }) }, idx)) })] })] }) })] })] });
}
