import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import {PageProps} from '@/types';
import alertOctagon from "@/lib/alertOctagon.json";
import Lottie from "lottie-react";
import React from "react";

export default function Dashboard({auth}: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard"/>

            <div className="bg-amber-500 text-gray-900 font-bold w-full p-2 text-center text-sm flex items-center justify-start absolute bottom-0">
                <div className="size-6">
                    <Lottie animationData={alertOctagon}/>
                </div>
                <p> Work in progress, please expect more features in upcoming weeks </p>
            </div>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">

                        <div className="p-6 text-gray-900">
                            <p className="font-bold">Things you can do as of {new Date().toDateString()}:</p>
                            <ol className="list-decimal pl-6">
                                <li className="underline underline-offset-4" key={0}>
                                    <Link href={route('sadmin_overview')}>Super Admin Overview</Link>
                                </li>
                                <li className="underline underline-offset-4" key={1}>
                                    <Link href={route('sadmin_products')}>Edit Product Details</Link>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
