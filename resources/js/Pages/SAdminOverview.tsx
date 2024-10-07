//@ts-nocheck
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import {PageProps} from '@/types';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/primitives/ui/accordion"
import {useEffect, useState} from "react";
import {Button} from "@/primitives/ui/button";
import Section from "@/Components/Section";

function AnalyticsBox({title, data, link}) {
    return <Link href={`/b2b/sadmin/${link}`}>
        <div className="bg-white p-6 text-center rounded-sm shadow-">
            <p className="font-mono text-4xl">{data}</p>
            <h3 className="text-lg font-bold"># {title}</h3>
        </div>
    </Link>
}

export default function SAdminOverview({auth, analytics}: PageProps) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Super Admin Overview</h2>}
        >
            <Head title="Super Admin Overview | King's Flavour"/>

            <Section>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-3 lg:gap-y-0 lg:gap-x-4">
                    <AnalyticsBox title="Products in catalogue" data={analytics.products} link={"products"}/>
                    <AnalyticsBox title="Customers Served" data={analytics.customers} link={"customers"}/>
                    <AnalyticsBox title="Cusines registered" data={analytics.cuisines} link={"cuisines"}/>
                </div>
                <p className="mt-1 text-gray-500 text-sm">click on tiles to manage data</p>
            </Section>


        </AuthenticatedLayout>
    );
}
