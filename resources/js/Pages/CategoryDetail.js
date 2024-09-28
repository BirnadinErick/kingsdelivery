import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import { Button } from "@/primitives/ui/button";
import { useState } from "react";
import ProductList from "@/Components/ProductList";
export default function CategoryDetail({ category, cuisines, categories, offeringCuisines, offeredProducts }) {
    const [products, setProducts] = useState(offeredProducts);
    return _jsxs(_Fragment, { children: [_jsx(Head, { title: `${category.name} | Cuisines` }), _jsxs(Layout, { cuisines: cuisines, categories: categories, children: [_jsx("section", { className: "px-4 lg:px-24 mb-6", children: _jsx("h2", { className: "text-xl capitalize font-bold font-serif", children: category.name }) }), _jsx("div", { className: "flex justify-around items-center", children: _jsx("img", { src: category.image, alt: category.name, className: "lg:h-[480px]" }) }), _jsxs("section", { className: "my-6 px-4 lg:px-24", children: [_jsxs("h2", { className: "text-xl font-bold capitalize", children: ["Cuisines Offering ", category.name] }), _jsxs("div", { className: "grid grid-cols-3 lg:grid-cols-8 gap-x-4 gap-y-4 my-3", children: [_jsx(Button, { variant: "outline", className: "bg-sky-100", onClick: () => {
                                            setProducts(offeredProducts);
                                        }, children: "All" }, 2003), offeringCuisines.map((oc, idx) => _jsx(Button, { variant: "outline", className: "bg-sky-100 capitalize", onClick: () => {
                                            setProducts(offeredProducts.filter(p => p.cuisine.name === oc.name));
                                        }, children: oc.name }, idx))] })] }), _jsxs("section", { className: "my-12 px-4 lg:px-24", children: [_jsxs("h2", { className: "text-xl font-bold", children: ["Products offered under ", category.name] }), _jsx(ProductList, { products: products })] })] })] });
}
