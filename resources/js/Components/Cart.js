import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
//@ts-nocheck
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/primitives/ui/sheet";
import { Button } from "@/primitives/ui/button";
import { ShoppingCart } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/primitives/ui/card";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "@/lib/cartSlice";
export default function Cart() {
    const cartItems = useSelector(state => state.cart.items);
    const sum = useSelector(state => state.cart.totalAmount);
    const dispatch = useDispatch();
    const clearCartHandler = () => {
        dispatch(clearCart());
    };
    return _jsxs(Sheet, { children: [_jsx(SheetTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", size: "icon", children: _jsx(ShoppingCart, { className: "h-4 w-4" }) }) }), _jsxs(SheetContent, { side: "right", children: [_jsxs(SheetHeader, { children: [_jsx(SheetTitle, { children: "Your Card" }), _jsx(SheetDescription, {})] }), _jsx("div", { className: "mb-8 space-y-2", children: cartItems.map((i, idx) => _jsx(Card, { children: _jsxs(CardHeader, { children: [_jsx(CardTitle, { children: i.name }), _jsxs(CardDescription, { children: [i.label, " \u00B7 \u00A3 ", i.price, " "] })] }) }, idx)) }), _jsx(SheetFooter, { children: _jsxs("div", { className: "flex justify-start items-baseline space-x-4", children: [_jsx(SheetClose, { children: _jsx(Button, { onClick: clearCartHandler, variant: "destructive", children: "Clear Cart" }) }), _jsxs(Button, { disabled: sum === 0, variant: "outline", onClick: async () => {
                                        const pids = cartItems.map(i => i.pid);
                                        try {
                                            const response = await axios.post('/api/checkout', {
                                                pids: pids
                                            });
                                            if (response.data.url) {
                                                window.location.href = response.data.url;
                                            }
                                        }
                                        catch (error) {
                                            console.error('Error redirecting to checkout:', error);
                                        }
                                    }, children: ["Checkout \u00A3 ", sum.toFixed(2)] })] }) })] })] });
}
