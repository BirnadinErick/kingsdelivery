import {Link} from "@inertiajs/react";
import {
    NavigationMenu, NavigationMenuContent,
    NavigationMenuItem, NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/primitives/ui/navigation-menu";
import Cart from "@/Components/Cart";

export default function DesktopNavBar({cuisines, categories}) {
    return <header className="hidden lg:flex px-4 lg:px-24 py-4 lg:justify-between lg:items-center">
        <div>
            <Link href="/"><h1 className="text-4xl font-bold font-serif">King's Delivery</h1></Link>
        </div>
        <div>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Cuisines</NavigationMenuTrigger>
                        <NavigationMenuContent className="min-w-fit whitespace-nowrap">
                            {cuisines.map((c, idx) =>
                                <NavigationMenuLink asChild key={idx} className="block px-6 py-2 my-3 capitalize">
                                    <Link href={`/cuisines/${c.cuisine_id}`}>
                                        {c.name}
                                    </Link>
                                </NavigationMenuLink>
                            )}
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                        <NavigationMenuContent className="min-w-fit whitespace-nowrap">
                            {
                                categories.map((c, idx) =>
                                    <NavigationMenuLink key={idx} asChild
                                                        className="block px-6 py-2 my-3 capitalize">
                                        <Link href={`/categories/${c.category_id}`}>
                                            {c.name}
                                        </Link>
                                    </NavigationMenuLink>
                                )
                            }
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Cart/>
                    </NavigationMenuItem>
                    {/*
                    <NavigationMenuItem>
                        <Button variant="default" asChild>
                            <Link href="/login">Log In</Link>
                        </Button>
                    </NavigationMenuItem>
*/}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    </header>
}
