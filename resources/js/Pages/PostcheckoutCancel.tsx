import {Head, Link} from '@inertiajs/react';
import {PageProps} from '@/types';
import Layout from "@/Layouts/Layout";

export default function PostcheckoutCancel({
                                    cuisines,
                                    categories
                                }: PageProps<{
    products: Array<any>,
    specialOffers: Array<any>,
    laravelVersion: string,
    phpVersion: string,
    cuisines: Array<any>,
    categories: Array<any>
}>) {
    return (
        <>
            <Head title="Post Checkout | Failed Transaction"/>

            <Layout cuisines={cuisines} categories={categories}>
                <section className="px-8 md:px-12 lg:px-24 xl:px-72">
                   Sorry, payment failed. Retry again.
                </section>
            </Layout>
        </>
    );
}
