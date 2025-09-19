import { Calendar, MapPin } from "lucide-react";
import { PhotoDisplay } from "./PhotoDisplay";

interface TimelineItem {
  title: string;
  company?: string;
  location?: string;
  period: string;
  description: string;
  technologies?: string[];
  result?: string;
  photo_path?: string;
}

interface TimelineProps {
  items: TimelineItem[];
  resultLabel?: string;
}

export function Timeline({ items, resultLabel = "Résultat :" }: TimelineProps) {
  return (
    <div className="space-y-8">
      {items.map((item, index) => (
        <div key={index} className="relative">
          {/* Timeline line */}
          {index < items.length - 1 && (
            <div className="absolute left-12 top-24 w-0.5 h-full bg-gray-200" />
          )}
          
          <div className="flex items-start space-x-4">
            {/* Timeline dot ou photo */}
            {item.photo_path ? (
              <PhotoDisplay
                src={item.photo_path}
                alt={`Logo ${item.company || item.title}`}
                size="lg"
                className="flex-shrink-0"
              />
            ) : (
              <div className="flex-shrink-0 w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
                <Calendar className="w-8 h-8 text-white" />
              </div>
            )}
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <span className="text-sm text-gray-500 mt-1 sm:mt-0">
                  {item.period}
                </span>
              </div>
              
              {item.company && (
                <div className="flex items-center text-gray-600 mb-2">
                  <span className="font-medium">{item.company}</span>
                  {item.location && (
                    <>
                      <span className="mx-2">•</span>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{item.location}</span>
                      </div>
                    </>
                  )}
                </div>
              )}
              
              <p className="text-gray-600 mb-3 whitespace-pre-line">
                {item.description}
              </p>
              
              {item.result && (
                <div className="mb-3 p-3 bg-green-50 border-l-4 border-green-400 rounded-r">
                  <p className="text-sm font-medium text-green-800 mb-1">{resultLabel}</p>
                  <p className="text-sm text-green-700 whitespace-pre-line">{item.result}</p>
                </div>
              )}
              
              {item.technologies && item.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}