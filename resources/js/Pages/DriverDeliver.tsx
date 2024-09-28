//@ts-nocheck
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import {PageProps} from '@/types';
import {Button} from "@/primitives/ui/button";

const AddressDisplay = ({jsonString}) => {
    const jsonObject = JSON.parse(jsonString);
    const {line1, line2, postal_code, city} = jsonObject;

    return (
        <span className="pl-4 block">
            {line1}
            {line2 ? `, ${line2}` : ''}, {postal_code}, {city}
        </span>
    );
};
export default function DriverDeliver({auth, deliveries}: PageProps) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Available Orders</h2>}
        >
            <Head title="Deliver | King's Flavour"/>

            <div className="py-4:">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8  grid grid-cols-1 gap-y-2 lg:gap-y-0 lg:grid-cols-3 lg:gap-12">
                    {
                        deliveries.map((d, idx) => <div key={idx} className="bg-white p-4 rounded-sm space-y-4 shadow-lg">
                                <p className="font-bold">Delivery#: <span>{d.id}</span></p>

                                <div>
                                    <p>Stops:</p>
                                    <ul className="list-disc px-8">
                                        {d.stops.map((i, idx) => <li key={idx}>{i.name} <span
                                            className="font-bold">#{i.order_id}</span></li>)}
                                    </ul>
                                </div>

                                <div>
                                    <span>Destination:</span>
                                    <AddressDisplay jsonString={d.address_text}/>
                                </div>

                                <Button asChild className="space-x-2" variant="default">
                                    <Link href={`/b2b/deliver-request/${d.id}`}>Request</Link>
                                </Button>
                            </div>
                        )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
