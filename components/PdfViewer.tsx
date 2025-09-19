"use client";

import Link from "next/link";
import { Download } from "lucide-react";
import clsx from "clsx";

interface PdfViewerProps {
  src: string;
  title: string;
  className?: string;
  height?: number;
  downloadLabel?: string;
}

export function PdfViewer({
  src,
  title,
  className,
  height = 600,
  downloadLabel = "Télécharger le PDF",
}: PdfViewerProps) {
  return (
    <div className={clsx("w-full rounded-lg border border-gray-200 bg-white shadow-sm", className)}>
      <iframe
        src={`${src}#toolbar=0&navpanes=0&scrollbar=0`}
        title={title}
        className="w-full"
        style={{ height }}
      />
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">
        <p className="text-sm text-gray-600">{title}</p>
        <Link
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <Download className="w-4 h-4" />
          {downloadLabel}
        </Link>
      </div>
    </div>
  );
}
