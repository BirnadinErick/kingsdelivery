import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Head, Link } from '@inertiajs/react';
import Layout from "@/Layouts/Layout";
import { EmblaCarousel } from "@/Components/EmblaCarousel";
import { Button } from "@/primitives/ui/button";
import ProductList from "@/Components/ProductList";
export default function Welcome({ products, specialOffers, cuisines, categories }) {
    return (_jsxs(_Fragment, { children: [_jsx(Head, { title: "Welcome" }), _jsxs(Layout, { cuisines: cuisines, categories: categories, children: [_jsx(EmblaCarousel, { cuisines: cuisines }), _jsxs("section", { className: "my-12 px-4 lg:px-24", children: [_jsxs("div", { className: "flex items-baseline justify-start space-x-4", children: [_jsx("h2", { className: "text-2xl font-bold", children: "Special Offers" }), _jsx(Button, { variant: "outline", asChild: true, className: "bg-sky-100", children: _jsx(Link, { href: "/categories/13", children: "See More" }) })] }), _jsx(ProductList, { products: specialOffers })] }), _jsxs("section", { className: "mt-24 mb-16 px-4 lg:px-24", children: [_jsxs("div", { className: "flex justify-start items-center space-x-4", children: [_jsx("h2", { className: "text-2xl font-bold", children: "Some Products We Offer" }), _jsx(Button, { variant: "outline", asChild: true, className: "bg-sky-100", children: _jsx(Link, { href: "/products", children: "See All" }) })] }), _jsx(ProductList, { products: products })] })] })] }));
}
