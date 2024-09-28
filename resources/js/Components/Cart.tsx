import {
    Sheet, SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/primitives/ui/sheet";
import {Button} from "@/primitives/ui/button";
import {ShoppingCart} from "lucide-react";
import {Card, CardDescription, CardHeader, CardTitle} from "@/primitives/ui/card";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {clearCart} from "@/lib/cartSlice";

export default function Cart() {
    const cartItems = useSelector(state => state.cart.items);
    const sum = useSelector(state => state.cart.totalAmount);

    const dispatch = useDispatch();

    const clearCartHandler = () => {
        dispatch(clearCart())
    }
    return <Sheet>
        <SheetTrigger asChild>
            <Button variant="outline" size="icon">
                <ShoppingCart className="h-4 w-4"/>
            </Button>
        </SheetTrigger>
        <SheetContent side="right">
            <SheetHeader>
                <SheetTitle>Your Card</SheetTitle>
                <SheetDescription>
                </SheetDescription>
            </SheetHeader>
            <div className="mb-8 space-y-2">
                {
                    cartItems.map((i, idx) => <Card key={idx}>
                            <CardHeader>
                                <CardTitle>{i.name}</CardTitle>
                                <CardDescription>{i.label} · £ {i.price} </CardDescription>
                            </CardHeader>
                        </Card>
                    )
                }
            </div>

            <SheetFooter>
                <div className="flex justify-start items-baseline space-x-4">
                    <SheetClose>
                        <Button onClick={clearCartHandler} variant="destructive">
                            Clear Cart
                        </Button>
                    </SheetClose>
                    <Button disabled={sum === 0} variant="outline"
                            onClick={async () => {
                                const pids = cartItems.map(i => i.pid)
                                try {
                                    const response = await axios.post('/api/checkout', {
                                        pids: pids
                                    });

                                    if (response.data.url) {
                                        window.location.href = response.data.url;
                                    }
                                } catch (error) {
                                    console.error('Error redirecting to checkout:', error);
                                }
                            }}>
                        Checkout £ {sum.toFixed(2)}
                    </Button>
                </div>
            </SheetFooter>
        </SheetContent>
    </Sheet>
}
