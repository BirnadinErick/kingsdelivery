import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import DesktopNavBar from "@/Components/DesktopNavBar";
import Cart from "@/Components/Cart";
import MobileNavSheet from "@/Components/MobileNavSheet";
export default function CustomerHeader({ cuisines, categories }) {
    return _jsxs(_Fragment, { children: [_jsx(DesktopNavBar, { categories: categories, cuisines: cuisines }), _jsxs("header", { className: "lg:hidden p-4 flex justify-between items-center", children: [_jsx("h1", { className: "text-2xl font-serif font-bold", children: "King's Delivery" }), _jsxs("nav", { className: "space-x-2", children: [_jsx(Cart, {}), _jsx(MobileNavSheet, { cuisines: cuisines, categories: categories })] })] })] });
}
