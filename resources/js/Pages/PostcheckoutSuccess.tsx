import {Head, Link} from '@inertiajs/react';
import {PageProps} from '@/types';
import Layout from "@/Layouts/Layout";

import {BellRing, Check, CircleArrowOutUpRight, Receipt} from "lucide-react"

import {cn} from "@/lib/utils"
import {Button} from "@/primitives/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/primitives/ui/card"
import {Fragment} from "react";

type CardProps = React.ComponentProps<typeof Card>

export function InfoCard({className, details, ...props}: CardProps) {
    return (
        <Card className={cn("w-[380px]", className)}>
            <CardHeader>
                <CardTitle>Thank you for choosing Us.</CardTitle>
                <CardDescription>We will process your order with these information.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className=" flex items-center space-x-4 rounded-md border p-4">
                    <Receipt/>
                    <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                            A Receipt was sent.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Separate order confirmation will be sent shortly.
                        </p>
                    </div>
                </div>
                <div>
                    <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500"/>
                        <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">
                                We will deliver to
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {details.address.line1},
                                {details.address.city} {details.address.postal_code}
                            </p>
                        </div>
                    </div>
                    <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500"/>
                        <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">
                                We will call you on
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {details.phone}
                            </p>
                        </div>
                    </div>
                    <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500"/>
                        <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">
                                It would take us
                            </p>
                            <p className="text-sm text-muted-foreground">
                                8 minutes to fulfill your order
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full" asChild>
                    <Link href="/">
                        <CircleArrowOutUpRight className="mr-2 h-4 w-4"/> Go checkout more
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

export default function PostcheckoutSuccess({
                                                cuisines,
                                                categories,
                                                details
                                            }: PageProps<{
    cuisines: Array<any>,
    categories: Array<any>,
    details: any
}>) {

    console.log(details)
    return (
        <>
            <Head title="Post Checkout | Failed Transaction"/>

            <Layout cuisines={cuisines} categories={categories}>
                <section className="flex justify-around items-start my-12">
                    <InfoCard details={details}/>
                </section>
            </Layout>
        </>
    );
}
