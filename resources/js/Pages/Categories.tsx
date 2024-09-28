import {Head, Link} from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import {Button} from "@/primitives/ui/button";

export default function Cuisines({cuisines, categories}) {
    return <>
        <Head title="Categories"/>

        <Layout cuisines={cuisines} categories={categories}>
            <section className="px-24">
               <h2 className="text-2xl font-bold font-serif">Categories We Have So Far</h2>

                <div className="my-4 space-x-4">
                    {categories.map((c, idx)=> <Button asChild>
                        <Link href={`/categories/${c.category_id}`} key={idx}>{c.name}</Link>
                    </Button> )}
                </div>
            </section>
        </Layout>
    </>;
}
