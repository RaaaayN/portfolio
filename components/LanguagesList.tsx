import { Globe, Star } from "lucide-react";
import { Card } from "./Card";
import { Badge } from "./Badge";

interface Language {
  language: string;
  level: string;
}

interface LanguagesListProps {
  languages: Language[];
}

export function LanguagesList({ languages }: LanguagesListProps) {
  if (!languages || languages.length === 0) return null;

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'natif':
        return 'bg-green-100 text-green-800';
      case 'courant':
        return 'bg-blue-100 text-blue-800';
      case 'b1':
      case 'b2':
        return 'bg-yellow-100 text-yellow-800';
      case 'a1':
      case 'a2':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <div className="flex items-center mb-4">
        <Globe className="w-6 h-6 text-blue-600 mr-3" />
        <h3 className="text-xl font-semibold text-gray-900">Langues</h3>
      </div>
      
      <div className="space-y-3">
        {languages.map((lang, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="font-medium text-gray-900">{lang.language}</span>
            </div>
            <Badge variant="secondary" className={getLevelColor(lang.level)}>
              {lang.level}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}
