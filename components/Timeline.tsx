"use client";

import { useState } from "react";
import { Calendar, MapPin, Image as ImageIcon, Star } from "lucide-react";
import { clsx } from "clsx";
import { PhotoDisplay } from "./PhotoDisplay";
import { ImageModal } from "./ImageModal";

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
  // État pour la modal d'images
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedImageTitle, setSelectedImageTitle] = useState("");

  // Fonctions pour gérer la modal d'images
  const openImageModal = (item: TimelineItem, clickedImageSrc: string) => {
    const altText = item.company ? `${item.title} - ${item.company}` : item.title;
    
    // Collecter les images de cette expérience spécifique
    const itemImages: string[] = [];
    
    // Ajouter la photo principale si elle existe
    if (item.photo_path && !itemImages.includes(item.photo_path)) {
      itemImages.push(item.photo_path);
    }
    
    // Ajouter l'image supplémentaire si elle existe
    if (item.image_path && !itemImages.includes(item.image_path)) {
      itemImages.push(item.image_path);
    }
    
    // Trouver l'index de l'image cliquée
    const index = itemImages.indexOf(clickedImageSrc);
    
    if (index !== -1 && itemImages.length > 0) {
      setSelectedImages(itemImages);
      setSelectedImageIndex(index);
      setSelectedImageTitle(altText);
      setIsImageModalOpen(true);
    }
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

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
                    <div 
                      className="cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => openImageModal(item, item.photo_path!)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          openImageModal(item, item.photo_path!);
                        }
                      }}
                      aria-label="Cliquer pour agrandir l'image"
                    >
                      <PhotoDisplay
                        src={item.photo_path}
                        alt={`Logo ${item.company || item.title}`}
                        size="lg"
                        className={clsx("relative z-50 ring-2 ring-white", isFeatured && "ring-amber-300")}
                      />
                    </div>
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
                        <button
                          type="button"
                          onClick={() => openImageModal(item, item.image_path!)}
                          className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1.5 text-sm font-medium text-blue-700 shadow-sm transition-transform hover:scale-105 hover:bg-blue-50"
                        >
                          <ImageIcon className="h-4 w-4" />
                          {viewImageLabel}
                        </button>
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

      {/* Modal d'images */}
      {selectedImages.length > 0 && (
        <ImageModal
          images={selectedImages}
          currentIndex={selectedImageIndex}
          isOpen={isImageModalOpen}
          onClose={closeImageModal}
          projectTitle={selectedImageTitle}
        />
      )}
    </>
  );
}
