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
import {Button} from "@/primitives/ui/button";
import {ShoppingCart} from "lucide-react";
import {ToggleGroup, ToggleGroupItem} from "@/primitives/ui/toggle-group";
import {addItemToCart} from "@/lib/cartSlice";
import {useState} from "react";
import {useDispatch} from "react-redux";

export default function ProductList({products}) {
    const [currVariation, setVariation] = useState(-1);
    const dispatch = useDispatch();

    function addToCart(product: any) {
        let variation;
        if (currVariation !== -1) {
            variation = product.variations.filter(p => p.id === currVariation)[0];
        } else {
            variation = product.variations[0]
        }

        let cartProduct = {
            id: product.product_id,
            price: parseFloat(variation.price),
            quantity: 1,
            totalPrice: parseFloat(variation.price),
            name: product.name,
            label: variation.label,
            pid: variation.price_id
        };

        dispatch(addItemToCart(cartProduct));
        setVariation(-1);
    }

    return <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-8 gap-y-12 my-3">
        {
            products.map((op, idx) => <div key={idx}>
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

                                        <ToggleGroup type="single" variant="solid"
                                                     defaultValue={op.variations[0].id}
                                                     onValueChange={(id) => {
                                                         setVariation(id);
                                                     }}>
                                            {
                                                op.variations.map((v, idx) =>
                                                    <ToggleGroupItem className="hover:text-black" key={idx}
                                                                     value={v.id} aria-label={v.label}>
                                                        {v.label} - £ {v.price}
                                                    </ToggleGroupItem>)
                                            }
                                        </ToggleGroup>
                                        <DrawerClose>
                                            <Button className="w-full mb-3" onClick={() => addToCart(op)}>Add
                                                to Cart</Button>
                                            <Button variant="outline"
                                                    className="w-full text-black">Cancel</Button>
                                        </DrawerClose>
                                    </DrawerFooter>
                                </div>
                            </DrawerContent>
                        </Drawer>
                    </div>
                </div>
            )
        }
    </div>
}
