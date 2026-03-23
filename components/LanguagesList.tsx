import { Globe, Star } from "lucide-react";
import { Card } from "./Card";
import { Badge } from "./Badge";

interface Language {
  language: string;
  level: string;
}

interface LanguagesListProps {
  languages: Language[];
  title?: string;
}

export function LanguagesList({ languages, title = "Langues" }: LanguagesListProps) {
  if (!languages || languages.length === 0) return null;

  const getLevelVariant = (level: string): "success" | "default" | "warning" | "secondary" => {
    switch (level.toLowerCase()) {
      case 'natif':
      case 'native':
        return 'success';
      case 'courant':
      case 'fluent':
      case 'professional':
        return 'default';
      case 'b1':
      case 'b2':
        return 'warning';
      case 'a1':
      case 'a2':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  return (
    <Card>
      <div className="flex items-center mb-4">
        <Globe className="w-6 h-6 text-accent-light mr-3" />
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>

      <div className="space-y-3">
        {languages.map((lang, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-amber-400" />
              <span className="font-medium text-white">{lang.language}</span>
            </div>
            <Badge variant={getLevelVariant(lang.level)}>
              {lang.level}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}
