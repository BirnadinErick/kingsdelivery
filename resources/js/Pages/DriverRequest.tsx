import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import {PageProps} from '@/types';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/primitives/ui/accordion"
import {useEffect, useState} from "react";
import {Button} from "@/primitives/ui/button";

const AddressDisplay = ({jsonString}) => {
    const jsonObject = JSON.parse(jsonString);
    const {line1, line2, postal_code, city} = jsonObject;

    return (
        <span className="pl-1 block">
            {line1}
            {line2 ? `, ${line2}` : ''}, {postal_code}, {city}
        </span>
    );
};

const Section = ({children}) => {
    return <section className="px-4 mt-4 mb-8"> {children} </section>
}

const openGoogleMapsDirections = (driverLocation, destination, stops) => {
    const origin = `${driverLocation.lat},${driverLocation.lng}`;
    const dest = `${destination.lat},${destination.lng}`;
    const waypoints = stops.map(stop => `${stop.lat},${stop.lng}`).join("|");

    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${dest}&waypoints=${waypoints}&travelmode=driving`;
};

const constructUserAddress = (address) => {
    return {lat: 0, lng: 0};
}
export default function DriverRequest({auth, delivery}: PageProps) {
    const [driverLoc, setDriverLoc] = useState({lat: 0, lng: 0});

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setDriverLoc({lat: position.coords.latitude, lng: position.coords.longitude});
        });
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Current Delivery</h2>}
        >
            <Head title="Deliver | King's Flavour"/>

            {/*overall metadata*/}
            <Section>
                <p>Delivery <span className="font-bold">#{delivery.id}</span></p>
                <p>Deadline: {delivery.deadline}</p>
            </Section>

            {/*stops data*/}
            <Section>
                <h2 className="text-2xl">Stops</h2>

                <ul>
                    {delivery.stops.map((s, idx) => <li key={idx}>
                        <div>
                            <p></p>
                            <div>
                                <Accordion type="single" collapsible>
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger><p>{s.name} - <span className="font-bold">#{s.order_id}</span>
                                        </p></AccordionTrigger>
                                        <AccordionContent>
                                            <ul className="list-decimal px-8">
                                                {s.items.map((i, idx) => <li key={idx}>{i.name} {i.label}</li>)}
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </div>
                    </li>)}
                </ul>
            </Section>

            <Section>
                <h2 className="text-2xl">Customer Details</h2>

                <div className="space-y-2 mt-2">
                    <p>Name: {delivery.customer.name}</p>
                    <p>Telephone: <a className="text-blue-400 underline underline-offset-4"
                                     href={`tel:${delivery.customer.telephone}`}>{delivery.customer.telephone}</a></p>
                    <div className="flex justify-start items-baseline">
                        <p>Address: </p>
                        <AddressDisplay jsonString={delivery.customer.address}/>
                    </div>

                    <Button asChild variant="default">
                        <a
                            target="_blank"
                            href={openGoogleMapsDirections(driverLoc, delivery.customer.coords, delivery.stops.map(s => s.location))}>
                            Start Directions
                        </a>
                    </Button>
                </div>
            </Section>


            <Section>
                <h2 className="text-2xl">Actions</h2>

                <div className="flex justify-start items-baseline space-x-4 mt-2">
                    <Button  variant="outline">
                        Fulfill Delivery
                    </Button>
                    <Button variant="destructive">
                        Abort Delivery
                    </Button>
                </div>
            </Section>
        </AuthenticatedLayout>
    );
}
