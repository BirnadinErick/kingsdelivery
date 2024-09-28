import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/primitives/ui/sheet";
import {Button} from "@/primitives/ui/button";
import {MenuIcon} from "lucide-react";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/primitives/ui/accordion";
import {NavigationMenuLink} from "@/primitives/ui/navigation-menu";
import {Link} from "@inertiajs/react";

export default function MobileNavSheet({cuisines, categories}) {
    return <Sheet>
        <SheetTrigger asChild>
            <Button variant="default" size="icon">
                <MenuIcon className="h-4 w-4"/>
            </Button>
        </SheetTrigger>
        <SheetContent side="left">
            <SheetHeader>
                <SheetTitle>Navigate the site.</SheetTitle>
                <SheetDescription>
                    Order from our chain of cuisines as enjoy the time.
                </SheetDescription>
            </SheetHeader>

            <div>
                <Accordion type="single" collapsible>
                    <AccordionItem value="cuisines">
                        <AccordionTrigger>Cuisines</AccordionTrigger>
                        <AccordionContent>
                            {
                                cuisines.map((c, idx) => <Link key={idx} href={`/cuisines/${c.cuisine_id}`}
                                    >
                                    <p className="capitalize mb-1">
                                        {c.name}
                                    </p>
                                    </Link>
                                )
                            }
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="categories">
                        <AccordionTrigger>Categories</AccordionTrigger>
                        <AccordionContent>
                            {
                                categories.map((c, idx) => <Link key={idx} href={`/categories/${c.category_id}`}>
                                    <p className="mb-1 capitalize">
                                        {c.name}
                                    </p>
                                </Link>
                                )
                            }
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

            </div>
        </SheetContent>
    </Sheet>
}
