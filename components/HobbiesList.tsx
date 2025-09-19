import { Heart, Music, Gamepad2, Footprints, Activity, Zap } from "lucide-react";
import { Card } from "./Card";
import { Badge } from "./Badge";

interface HobbiesListProps {
  hobbies: string[];
  title?: string;
}

export function HobbiesList({ hobbies, title = "Centres d'intérêt" }: HobbiesListProps) {
  if (!hobbies || hobbies.length === 0) return null;

  const getHobbyIcon = (hobby: string) => {
    const hobbyLower = hobby.toLowerCase();
    if (hobbyLower.includes('course') || hobbyLower.includes('trail')) return <Footprints className="w-4 h-4" />;
    if (hobbyLower.includes('tennis')) return <Activity className="w-4 h-4" />;
    if (hobbyLower.includes('football') || hobbyLower.includes('soccer')) return <Zap className="w-4 h-4" />;
    if (hobbyLower.includes('musique')) return <Music className="w-4 h-4" />;
    if (hobbyLower.includes('jeu') || hobbyLower.includes('gaming')) return <Gamepad2 className="w-4 h-4" />;
    return <Heart className="w-4 h-4" />;
  };

  return (
    <Card>
      <div className="flex items-center mb-4">
        <Heart className="w-6 h-6 text-red-600 mr-3" />
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {hobbies.map((hobby, index) => (
          <div key={index} className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg">
            {getHobbyIcon(hobby)}
            <span className="text-gray-700">{hobby}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
