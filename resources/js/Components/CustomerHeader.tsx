import DesktopNavBar from "@/Components/DesktopNavBar";
import Cart from "@/Components/Cart";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/primitives/ui/sheet"
import {Button} from "@/primitives/ui/button";
import {MenuIcon, ShoppingCart} from "lucide-react";
import MobileNavSheet from "@/Components/MobileNavSheet";


export default function CustomerHeader({cuisines, categories}) {

    return <>
        <DesktopNavBar categories={categories} cuisines={cuisines}/>

        <header className="lg:hidden p-4 flex justify-between items-center">
            <h1 className="text-2xl font-serif font-bold">King's Delivery</h1>
            <nav className="space-x-2">
                <Cart/>

                <MobileNavSheet cuisines={cuisines} categories={categories}/>
            </nav>
        </header>
    </>
}
