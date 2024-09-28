import {Head, Link} from "@inertiajs/react";
import Layout from "@/Layouts/Layout";

export default function Cuisines({cuisines, categories}) {
    return <>
        <Head title="Cuisines"/>

        <Layout cuisines={cuisines} categories={categories}>
            <section className="px-24">
               <h2 className="text-2xl font-bold font-serif">Cuisines We Have So Far</h2>

                <div className="my-4">
                    {cuisines.map((c, idx)=> <Link href={`/cuisines/${c.cuisine_id}`} key={idx}>{c.name}</Link>)}
                </div>
            </section>
        </Layout>
    </>;
}
