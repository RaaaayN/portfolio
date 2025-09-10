import { Award, CheckCircle } from "lucide-react";
import { Card } from "./Card";

interface CertificationsListProps {
  certifications: string[];
}

export function CertificationsList({ certifications }: CertificationsListProps) {
  if (!certifications || certifications.length === 0) return null;

  return (
    <Card>
      <div className="flex items-center mb-4">
        <Award className="w-6 h-6 text-blue-600 mr-3" />
        <h3 className="text-xl font-semibold text-gray-900">Certifications</h3>
      </div>
      
      <div className="space-y-3">
        {certifications.map((cert, index) => (
          <div key={index} className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <p className="text-gray-700">{cert}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
