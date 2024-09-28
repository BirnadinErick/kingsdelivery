import {Head, Link} from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import {Button} from "@/primitives/ui/button";
import {Badge} from "@/primitives/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/primitives/ui/dialog";
import {
    Drawer, DrawerClose,
    DrawerContent,
    DrawerDescription, DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/primitives/ui/drawer";
import {ShoppingCart} from "lucide-react";
import {ToggleGroup, ToggleGroupItem} from "@/primitives/ui/toggle-group";

export default function Products({cuisines, categories, products}) {
    return <>
        <Head title="Products"/>

        <Layout cuisines={cuisines} categories={categories}>
            <section className="px-24">
                <h2 className="text-2xl font-bold font-serif">Products we offer</h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-12 my-3">
                    {
                        products.map((op, idx) => {
                            if (op.variations === undefined || op.variations === null || op.variations === '') {
                                op.variations = JSON.stringify({
                                    values: [
                                        {label: "Normal", optionPrice: 0}
                                    ]
                                });
                            }

                            console.log(op)
                            const variations = JSON.parse(op.variations);

                            return <div key={idx}>
                                <img className="rounded-sm" src={op.image} alt={op.name}/>
                                <div className="mt-3 flex justify-start items-baseline space-x-2">
                                    <p className="font-bold">{op.name}</p>
                                    <Badge variant="solid" className="bg-sky-200 py-1 px-4">{op.category.name}</Badge>
                                </div>

                                <p className="text-slate-800 mt-1 truncate">{op.description}</p>
                                <Dialog>
                                    <DialogTrigger className="text-sky-800 cursor-pointer">
                                        Read More Description...
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle className="font-bold mb-4">{op.name}</DialogTitle>
                                            <DialogDescription className="space-y-4">
                                                <img src={op.image} alt={op.name}/>
                                                <span className="block">
                                                    {op.description}
                                                </span>
                                            </DialogDescription>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>

                                <div className="mt-3">
                                    <Drawer>
                                        <DrawerTrigger asChild>
                                            <Button variant="outline" className="bg-black text-white">
                                                <ShoppingCart className="mr-2 h-4 w-4"/>
                                                Add to Cart £ {op.price}
                                            </Button>
                                        </DrawerTrigger>
                                        <DrawerContent variant="solid" className="bg-gray-950 text-slate-50">
                                            <div className="mx-auto w-full max-w-lg">
                                                <DrawerHeader>
                                                    <DrawerTitle>Choose the Variant.</DrawerTitle>
                                                    <DrawerDescription>Select any one of our varying
                                                        option</DrawerDescription>
                                                    <div>
                                                        <img src={op.image} alt={op.name} className="rounded-sm"/>
                                                    </div>
                                                </DrawerHeader>
                                                <DrawerFooter>
                                                    <p className="text-gray-300">Upgrade your order for a fraction of a
                                                        cost...</p>
                                                    <ToggleGroup type="single" variant="solid">
                                                        {
                                                            variations.values.map((v, idx) =>
                                                                <ToggleGroupItem className="hover:text-black" key={idx}
                                                                                 value={v.label} aria-label={v.label}>
                                                                    {v.label} + £ {v.optionPrice}
                                                                </ToggleGroupItem>
                                                            )
                                                        }
                                                    </ToggleGroup>
                                                    <Button>Add to Cart</Button>
                                                    <DrawerClose>
                                                        <Button variant="outline"
                                                                className="w-full text-black">Cancel</Button>
                                                    </DrawerClose>
                                                </DrawerFooter>
                                            </div>
                                        </DrawerContent>
                                    </Drawer>
                                </div>
                            </div>
                        })
                    }
                </div>
            </section>
        </Layout>
    </>;
}
