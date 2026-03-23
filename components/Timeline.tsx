"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar, MapPin, X, Image as ImageIcon, Star } from "lucide-react";
import { clsx } from "clsx";
import { PhotoDisplay } from "./PhotoDisplay";

interface SubRole {
  title: string;
  type: string;
  period: string;
  remote?: boolean;
}

interface TimelineItem {
  title: string;
  company?: string;
  location?: string;
  period: string;
  subRoles?: SubRole[];
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
  remoteLabel?: string;
}

export function Timeline({
  items,
  resultLabel = "Résultat :",
  viewImageLabel = "Voir la photo",
  closeImageLabel = "Fermer la photo",
  featuredLabel = "Featured",
  remoteLabel = "À distance",
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
                <div className="absolute left-[4.5rem] top-24 h-full w-0.5 bg-gradient-to-b from-violet-500/50 via-violet-500/20 to-transparent -z-10" />
              )}

              <div
                className={clsx(
                  "relative z-0 flex items-start space-x-4 rounded-2xl border p-6 transition-shadow glass shadow-card",
                  isFeatured
                    ? "border-amber-400/40 shadow-[0_0_40px_rgba(251,191,36,0.15)]"
                    : "border-transparent hover:border-white/[0.15]"
                )}
              >
                {/* Timeline dot ou photo */}
                <div className="relative z-30 flex h-24 w-24 flex-shrink-0 items-center justify-center">
                  <div className="absolute inset-0 z-40 rounded-full border-2 border-white/10" />
                  {item.photo_path ? (
                    <PhotoDisplay
                      src={item.photo_path}
                      alt={`Logo ${item.company || item.title}`}
                      size="lg"
                      className={clsx("relative z-50 ring-2 ring-white/10", isFeatured && "ring-amber-400/50")}
                    />
                  ) : (
                    <div
                      className={clsx(
                        "relative z-50 flex h-full w-full items-center justify-center rounded-full border-2 border-white/10 shadow-md",
                        isFeatured ? "bg-amber-400" : "bg-gradient-to-br from-violet-600 to-cyan-accent"
                      )}
                    >
                      <Calendar className="h-8 w-8 text-white" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      {item.title}
                      {isFeatured && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-0.5 text-xs font-medium text-amber-300">
                          <Star className="h-3 w-3" />
                          {featuredLabel}
                        </span>
                      )}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                      <span className="text-sm text-slate-500">{item.period}</span>
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
                            className="inline-flex items-center gap-2 rounded-full border border-white/[0.15] bg-transparent px-3 py-1.5 text-sm font-medium text-slate-400 shadow-sm transition-transform hover:scale-105 hover:bg-white/[0.08]"
                          >
                            <ImageIcon className="h-4 w-4" />
                            {viewImageLabel}
                          </button>
                          <div className="pointer-events-none absolute right-0 bottom-full mb-2 hidden w-48 overflow-hidden rounded-xl border border-white/10 bg-surface-raised shadow-lg group-hover:block group-focus-within:block z-20">
                            <div className="relative aspect-[4/3] w-full bg-surface-overlay">
                              <Image
                                src={item.image_path}
                                alt={altText}
                                fill
                                className="object-cover"
                                sizes="192px"
                              />
                            </div>
                            {(item.image_caption || altText) && (
                              <div className="border-t border-white/[0.08] bg-surface-raised px-3 py-2">
                                <p className="text-xs font-medium text-slate-400">
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
                    <div className="mb-2 flex flex-col gap-1">
                      <div className="flex items-center text-slate-400">
                        <span className="font-medium">{item.company}</span>
                        {item.location && (
                          <>
                            <span className="mx-2 text-white/20">|</span>
                            <div className="flex items-center text-slate-400">
                              <MapPin className="mr-1 h-4 w-4" />
                              <span>{item.location}</span>
                            </div>
                          </>
                        )}
                      </div>
                      {item.subRoles && item.subRoles.length > 0 && (
                        <div className="flex flex-col gap-1 pl-1 border-l-2 border-white/10 ml-0.5">
                          {item.subRoles.map((role, roleIndex) => (
                            <div key={roleIndex} className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
                              <span className="font-medium text-slate-300">{role.title}</span>
                              <span className="rounded-full bg-violet-500/20 px-2 py-0.5 text-xs font-medium text-violet-300">{role.type}</span>
                              {role.remote && (
                                <span className="rounded-full bg-white/[0.08] px-2 py-0.5 text-xs text-slate-400">{remoteLabel}</span>
                              )}
                              <span className="text-xs text-slate-500">{role.period}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mb-3">
                    {Array.isArray(item.description) ? (
                      <ul className="list-disc space-y-1 pl-5 text-slate-400">
                        {item.description.map((line, lineIndex) => (
                          <li key={lineIndex} className="leading-relaxed">
                            {line}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="whitespace-pre-line text-slate-400 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {item.result && (
                    <div className="mb-3 rounded-r border-l-4 border-emerald-400 bg-emerald-500/10 p-3">
                      <p className="mb-1 text-sm font-medium text-emerald-300">
                        {resultLabel}
                      </p>
                      <p className="text-sm text-emerald-300 whitespace-pre-line">
                        {item.result}
                      </p>
                    </div>
                  )}

                  {item.technologies && item.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="rounded-full bg-white/[0.08] px-2 py-1 text-xs text-slate-300 font-mono"
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
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-surface-raised shadow-2xl"
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
            <div className="relative h-[60vh] min-h-[320px] w-full bg-surface-overlay">
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
              <div className="border-t border-white/[0.08] bg-surface-raised p-6">
                <p className="text-sm font-semibold text-white">
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
