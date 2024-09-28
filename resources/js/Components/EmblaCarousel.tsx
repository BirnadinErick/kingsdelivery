//@ts-nocheck
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {useCallback, useEffect, useState} from "react";
import {Link} from "@inertiajs/react";
import {Button} from "@/primitives/ui/button";

export const EmblaCarousel = ({cuisines}: { cuisines: Array<any> }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({loop: true}, [
        Autoplay({playOnInit: true, delay: 2000})
    ]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on('select', onSelect);
    }, [emblaApi, onSelect]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <div className="relative w-full my-8">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {cuisines.map((c, index) => (
                        <Link
                            key={index}
                            href={`/cuisines/${c.cuisine_id}`}
                            className="flex-shrink-0 w-full"
                            rel="noopener noreferrer"
                        >
                            <img
                                src={c.image}
                                alt={c.name}
                                className="w-full h-[60vh] object-cover"
                            />
                        </Link>
                    ))}
                </div>
            </div>

            {/* Prev Button */}
            <Button
                variant="outline"
                className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10"
                onClick={scrollPrev}
            >
                Prev Cuisine
            </Button>

            {/* Next Button */}
            <Button
                variant="outline"
                className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10"
                onClick={scrollNext}
            >
                Next Cuisine
            </Button>

        </div>
    );
};
