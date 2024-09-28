import {Link} from '@inertiajs/react'

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/primitives/ui/navigation-menu"
import {
    Sheet, SheetClose,
    SheetContent,
    SheetDescription, SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/primitives/ui/sheet"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/primitives/ui/card"


import {Button} from "@/primitives/ui/button"
import {useDispatch, useSelector} from "react-redux";
import {ShoppingCart} from "lucide-react";
import {clearCart} from "@/lib/cartSlice"
import {useCallback} from "react";
import axios from "axios";
import CustomerHeader from "@/Components/CustomerHeader";

export default function Layout({categories, cuisines, children}: {
    categories: Array<any>;
    cuisines: Array<any>;
    children: any
}) {

    return (
        <>
            <CustomerHeader cuisines={cuisines} categories={categories}/>

            <main>
                {children}
            </main>

            <footer className="px-4 lg:px-24 py-4 bg-slate-200">
                <h2 className="text-2xl font-bold font-serif">Kings Delivery</h2>

                <div className="my-4 space-y-2">
                    <p>Address</p>
                    <p>Telephone</p>
                </div>
                <div className="my-4 space-y-2">
                    © All Rights Reserved by Walton Fernando.
                </div>
            </footer>
        </>
    )
}
