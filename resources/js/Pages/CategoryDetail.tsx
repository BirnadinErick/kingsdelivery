import {Head, Link} from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import {Button} from "@/primitives/ui/button";
import {useState} from "react";
import ProductList from "@/Components/ProductList";

export default function CategoryDetail({category, cuisines, categories, offeringCuisines, offeredProducts}) {
    const [products, setProducts] = useState(offeredProducts);

    return <>
        <Head title={`${category.name} | Cuisines`}/>

        <Layout cuisines={cuisines} categories={categories}>
            <section className="px-4 lg:px-24 mb-6">
                <h2 className="text-xl capitalize font-bold font-serif">{category.name}</h2>
            </section>

            <div className="flex justify-around items-center">
                <img src={category.image} alt={category.name} className="lg:h-[480px]"/>
            </div>

            <section className="my-6 px-4 lg:px-24">
                <h2 className="text-xl font-bold capitalize">Cuisines Offering {category.name}</h2>

                <div className="grid grid-cols-3 lg:grid-cols-8 gap-x-4 gap-y-4 my-3">
                    <Button key={2003} variant="outline" className="bg-sky-100" onClick={() => {
                        setProducts(offeredProducts)
                    }}>
                        All
                    </Button>

                    {
                        offeringCuisines.map((oc, idx) =>
                            <Button key={idx} variant="outline" className="bg-sky-100 capitalize" onClick={() => {
                                setProducts(offeredProducts.filter(p => p.cuisine.name === oc.name))
                            }}>
                                {oc.name}
                            </Button>
                        )
                    }
                </div>
            </section>

            <section className="my-12 px-4 lg:px-24">
                <h2 className="text-xl font-bold">Products offered under {category.name}</h2>

                <ProductList products={products} />
            </section>
        </Layout>
    </>;
}
