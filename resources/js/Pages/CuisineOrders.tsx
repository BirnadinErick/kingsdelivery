import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import {PageProps} from '@/types';
import {Button} from "@/primitives/ui/button";
import {CheckCircle} from "lucide-react";
import alertOctagon from "@/lib/alertOctagon.json";
import Lottie from "lottie-react";
import {useEffect} from "react";

export default function CuisineOrders({auth, cuisine, orders}: PageProps) {
    useEffect(() => {
        const intId = setInterval(() => {
            console.log('refresh')
            window.location.reload();
        }, 1000 * import.meta.env.VITE_ORDER_REFRESH_INT);

        return () => clearInterval(intId)
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Current Orders</h2>}
        >
            <Head title={cuisine.name + " Orders | King's Delivery"}/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-3 gap-12">
                    {
                        orders.map((o, idx) => <div key={idx}>
                            <div className="bg-white p-4 rounded-sm space-y-4 shadow-lg">
                                <p className="font-bold">Order#: <span>{o.id}</span></p>

                                <div className="flex justify-start items-center space-x-1">
                                    <div className="size-8">
                                        <Lottie animationData={alertOctagon}/>
                                    </div>
                                    <p>Prepare before: {o.deadline} </p>
                                </div>

                                <div>
                                    <p>Prepare:</p>
                                    <ul className="list-disc px-8">
                                        {o.items.map((i, idx) => <li key={idx}>{i.product.name} - {i.label}</li>)}
                                    </ul>
                                </div>

                                <p>Assigned driver name: Birnadin E.</p>

                                <Button className="space-x-2" variant="default"><CheckCircle
                                    className="size-4"></CheckCircle> <span> Mark as Ready</span></Button>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
