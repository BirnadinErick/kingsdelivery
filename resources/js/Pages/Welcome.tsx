import {Head, Link} from '@inertiajs/react';
import {PageProps} from '@/types';
import Layout from "@/Layouts/Layout";
import {EmblaCarousel} from "@/Components/EmblaCarousel";
import {Button} from "@/primitives/ui/button";
import ProductList from "@/Components/ProductList";

export default function Welcome({
                                    products,
                                    specialOffers,
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
            <Head title="Welcome"/>

            <Layout cuisines={cuisines} categories={categories}>
                <EmblaCarousel cuisines={cuisines}/>

                <section className="my-12 px-4 lg:px-24">
                    <div className="flex items-baseline justify-start space-x-4">
                        <h2 className="text-2xl font-bold">
                            Special Offers
                        </h2>

                        <Button variant="outline" asChild className="bg-sky-100">
                            <Link href="/categories/13">See More</Link>
                        </Button>

                    </div>

                    <ProductList products={specialOffers}/>
                </section>


                <section className="mt-24 mb-16 px-4 lg:px-24">
                    <div className="flex justify-start items-center space-x-4">
                        <h2 className="text-2xl font-bold">
                            Some Products We Offer
                        </h2>
                        <Button variant="outline" asChild className="bg-sky-100">
                            <Link href="/products">See All</Link>
                        </Button>
                    </div>

                    <ProductList products={products}/>
                </section>
            </Layout>
        </>
    );
}
