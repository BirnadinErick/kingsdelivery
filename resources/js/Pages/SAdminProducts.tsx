//@ts-nocheck
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {z} from "zod"
import {Head, Link} from '@inertiajs/react';
import {PageProps} from '@/types';
import {Button} from "@/primitives/ui/button";
import {ScrollArea} from "@/components/ui/scroll-area";
import {ArrowRightCircleIcon} from "lucide-react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useEffect, useState} from "react";
import {Textarea} from "@/components/ui/textarea";

function ProductImage({url}: { url: string }) {
    if (!url) {
        return null;
    }

    const fullUrl = url.startsWith('/') ? `${window.location.origin}${url}` : url;
    return <img
        src={fullUrl}
        alt="Product Banner"
        className="size-72"
    />
}

const formSchema = z.object({
    product_id: z.number().positive(),
    name: z.string().min(2).max(255),
    image: z.instanceof(File).optional(),
    description: z.string().max(1000),
    price: z.coerce.number().positive().multipleOf(0.01),
})

export default function SAdminProducts({auth, products}: PageProps) {
    const [selectedProduct, setSelectedProduct] = useState(products[0]);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            product_id: selectedProduct?.product_id || '',
            name: selectedProduct?.name || "",
            image: undefined,
            description: selectedProduct?.description || "",
            price: parseFloat(selectedProduct?.price) || 0,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const formData = new FormData();
            formData.append('product_id', values.product_id.toString());
            formData.append('name', values.name);
            formData.append('description', values.description || '');
            formData.append('price', values.price.toString());
            if (values.image) {
                formData.append('image', values.image);
            }

            const response = await fetch('/api/sadmin/products', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                console.error('POST failed')
            }

            // TODO: rehydrate new product without page refresh
            window.location.reload();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }


    useEffect(() => {
        form.reset({
            product_id: selectedProduct?.product_id || '',
            name: selectedProduct?.name || "",
            description: selectedProduct?.description || "",
            price: selectedProduct?.price || 0,
        });
    }, [selectedProduct, form]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manage Products</h2>}
        >
            <Head title="Super Admin Products Management| King's Flavour"/>
            <p className="block lg:hidden">please visit this site in a wider screen</p>

            <main className="hidden lg:flex">
                <ScrollArea className="h-screen w-[350px] flex-none  ">
                    <ul className="list-disc">
                        {products.map((p, idx) => <li key={idx}>
                            <div
                                onClick={() => {
                                    setSelectedProduct(p)
                                    setImagePreview(p.image);
                                }}
                                className="cursor-pointer bg-primary border-t-[0.5px] border-primary-foreground text-primary-foreground py-4 px-8 w-full flex justify-between items-center">
                                {p.name}
                                <ArrowRightCircleIcon/>
                            </div>
                        </li>)}
                    </ul>
                </ScrollArea>


                <div className="grow px-12 py-4 max-w-7xl">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Product Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter product name" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            The name of your product.
                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-start justify-start w-3/5 space-x-12">
                                <ProductImage url={imagePreview || selectedProduct.image}/>
                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={({field: {onChange, value, ...field}}) => (
                                        <FormItem>
                                            <FormLabel>Product Image</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        onChange(file);

                                                        // Update image preview
                                                        if (file) {
                                                            const reader = new FileReader();
                                                            reader.onloadend = () => {
                                                                setImagePreview(reader.result as string);
                                                            };
                                                            reader.readAsDataURL(file);
                                                        } else {
                                                            setImagePreview(null);
                                                        }
                                                    }}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Upload an image for your product. Advised to add square image
                                            </FormDescription>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="description"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter product description"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Provide a brief description of your product.
                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="price"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="0.01"
                                                placeholder="0.00"
                                                {...field}
                                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Set the price for your product.
                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <Input type="hidden" {...form.register('product_id')} />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>

                </div>
            </main>

        </AuthenticatedLayout>
    );
}
