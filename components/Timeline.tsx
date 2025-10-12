"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar, MapPin, X, Image as ImageIcon, Star } from "lucide-react";
import { clsx } from "clsx";
import { PhotoDisplay } from "./PhotoDisplay";

interface TimelineItem {
  title: string;
  company?: string;
  location?: string;
  period: string;
  description: string | string[];
  technologies?: string[];
  result?: string;
  photo_path?: string;
  image_path?: string;
  image_caption?: string;
  featured?: boolean;
}

interface TimelineProps {
  items: TimelineItem[];
  resultLabel?: string;
  viewImageLabel?: string;
  closeImageLabel?: string;
  featuredLabel?: string;
}

export function Timeline({
  items,
  resultLabel = "Resultat :",
  viewImageLabel = "Voir la photo",
  closeImageLabel = "Fermer la photo",
  featuredLabel = "Featured",
}: TimelineProps) {
  const [activeImage, setActiveImage] = useState<{
    src: string;
    alt: string;
    caption?: string;
  } | null>(null);

  return (
    <>
      <div className="space-y-8">
        {items.map((item, index) => {
          const altText = item.company
            ? `${item.title} - ${item.company}`
            : item.title;
          const isFeatured = Boolean(item.featured);

          return (
            <div key={index} className="relative">
              {/* Timeline line */}
              {index < items.length - 1 && (
                <div className="absolute left-[4.5rem] top-24 h-full w-0.5 bg-gray-200 -z-10" />
              )}

              <div
                className={clsx(
                  "relative z-0 flex items-start space-x-4 rounded-2xl border bg-white p-6 shadow-sm transition-shadow",
                  isFeatured
                    ? "border-amber-300 bg-amber-50 shadow-lg ring-2 ring-amber-200/60"
                    : "border-gray-100 hover:shadow-md"
                )}
              >
                {/* Timeline dot ou photo */}
                <div className="relative z-30 flex h-24 w-24 flex-shrink-0 items-center justify-center">
                  <div className="absolute inset-0 z-40 rounded-full border-2 border-white" />
                  {item.photo_path ? (
                    <PhotoDisplay
                      src={item.photo_path}
                      alt={`Logo ${item.company || item.title}`}
                      size="lg"
                      className={clsx("relative z-50 ring-2 ring-white", isFeatured && "ring-amber-300")}
                    />
                  ) : (
                    <div
                      className={clsx(
                        "relative z-50 flex h-full w-full items-center justify-center rounded-full border-2 border-white shadow-md",
                        isFeatured ? "bg-amber-400" : "bg-blue-600"
                      )}
                    >
                      <Calendar className="h-8 w-8 text-white" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      {item.title}
                      {isFeatured && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                          <Star className="h-3 w-3" />
                          {featuredLabel}
                        </span>
                      )}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                      <span className="text-sm text-gray-500">{item.period}</span>
                      {item.image_path && (
                        <div className="group relative inline-block">
                          <button
                            type="button"
                            onClick={() =>
                              setActiveImage({
                                src: item.image_path!,
                                alt: altText,
                                caption: item.image_caption,
                              })
                            }
                            className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1.5 text-sm font-medium text-blue-700 shadow-sm transition-transform hover:scale-105 hover:bg-blue-50"
                          >
                            <ImageIcon className="h-4 w-4" />
                            {viewImageLabel}
                          </button>
                          <div className="pointer-events-none absolute right-0 bottom-full mb-2 hidden w-48 overflow-hidden rounded-xl border border-blue-100 bg-white shadow-lg group-hover:block group-focus-within:block z-20">
                            <div className="relative aspect-[4/3] w-full bg-gray-100">
                              <Image
                                src={item.image_path}
                                alt={altText}
                                fill
                                className="object-cover"
                                sizes="192px"
                              />
                            </div>
                            {(item.image_caption || altText) && (
                              <div className="border-t border-blue-50 bg-white px-3 py-2">
                                <p className="text-xs font-medium text-gray-700">
                                  {item.image_caption || altText}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {item.company && (
                    <div className="mb-2 flex items-center text-gray-600">
                      <span className="font-medium">{item.company}</span>
                      {item.location && (
                        <>
                          <span className="mx-2 text-gray-300">|</span>
                          <div className="flex items-center">
                            <MapPin className="mr-1 h-4 w-4" />
                            <span>{item.location}</span>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  <div className="mb-3">
                    {Array.isArray(item.description) ? (
                      <ul className="list-disc space-y-1 pl-5 text-gray-600">
                        {item.description.map((line, lineIndex) => (
                          <li key={lineIndex} className="leading-relaxed">
                            {line}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="whitespace-pre-line text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {item.result && (
                    <div className="mb-3 rounded-r border-l-4 border-green-400 bg-green-50 p-3">
                      <p className="mb-1 text-sm font-medium text-green-800">
                        {resultLabel}
                      </p>
                      <p className="text-sm text-green-700 whitespace-pre-line">
                        {item.result}
                      </p>
                    </div>
                  )}

                  {item.technologies && item.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveImage(null)}
              className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition-transform hover:scale-105"
              aria-label={closeImageLabel}
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative h-[60vh] min-h-[320px] w-full bg-gray-100">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
              />
            </div>
            {(activeImage.caption || activeImage.alt) && (
              <div className="border-t border-gray-100 bg-white p-6">
                <p className="text-sm font-semibold text-gray-900">
                  {activeImage.caption || activeImage.alt}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
