"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export function TestimonialsSlider({ items }: { items: Testimonial[] }) {
  const locale = useLocale();
  const isRtl = locale === "ar";

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    direction: isRtl ? "rtl" : "ltr",
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="space-y-4">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {items.map((item, index) => (
            <div
              key={`${item.author}-${index}`}
              className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_60%]"
            >
              <Card className="h-full">
                <CardContent className="space-y-4 p-6">
                  <p
                    className={`text-lg leading-8 ${
                      isRtl ? "text-right" : "text-left"
                    }`}
                  >
                    &quot;{item.quote}&quot;
                  </p>
                  <div>
                    <p
                      className={`font-semibold ${
                        isRtl ? "text-right" : "text-left"
                      }`}
                    >
                      {item.author}
                    </p>
                    <p
                      className={`text-sm text-muted ${
                        isRtl ? "text-right" : "text-left"
                      }`}
                    >
                      {item.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <div className={`flex gap-2 ${isRtl ? "flex-row-reverse" : ""}`}>
        <Button variant="outline" size="icon" onClick={scrollPrev}>
          <ChevronLeft className={`h-4 w-4 ${isRtl ? "rtl-flip" : ""}`} />
        </Button>
        <Button variant="outline" size="icon" onClick={scrollNext}>
          <ChevronRight className={`h-4 w-4 ${isRtl ? "rtl-flip" : ""}`} />
        </Button>
      </div>
    </div>
  );
}
