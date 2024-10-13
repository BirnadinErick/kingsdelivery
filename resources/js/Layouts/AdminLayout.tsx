import {Link} from "@inertiajs/react";
import {Button} from "@/components/ui/button";

export default function AdminLayout({children}) {
    return <>
        <header className="w-full bg-primary-foreground py-4 flex justify-between items-center">
            <div className="mx-8">
                <p className="text-2xl font-serif font-bold">King's Delivery | Admin</p>
            </div>

            <div className="flex justify-start items-center space-x-4 mx-8">
            <nav className="flex items-baseline justify-start space-x-4 mx-2 text-sm text-gray-600">
                <Link href="/b2b/sadmin/overview">Overview</Link>
                <Link href="/b2b/sadmin/products">Products</Link>
                <Link href="/b2b/sadmin/cuisines">Cuisines</Link>
                <Link href="/b2b/sadmin/categories">Categories</Link>
            </nav>
            <div className="mx-4">
                <form action="/logout" method="POST">
                    <Button variant="destructive" type="submit">
                        Logout
                    </Button>
                </form>
            </div>
            </div>
        </header>
    <main>{children}</main>
    </>
}
