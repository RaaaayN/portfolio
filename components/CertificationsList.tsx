import { Award, CheckCircle, Eye } from "lucide-react";
import { Card } from "./Card";
import Link from "next/link";

interface CertificationsListProps {
  certifications: {
    id: string;
    title: string;
    issuer?: string;
    pdf?: string;
  }[];
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
        {certifications.map((certification) => (
          <div
            key={certification.id}
            className="flex items-start justify-between gap-4"
          >
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-700 font-medium">
                  {certification.title}
                </p>
                {certification.issuer && (
                  <p className="text-sm text-gray-500">
                    {certification.issuer}
                  </p>
                )}
              </div>
            </div>
            {certification.pdf && (
              <Link
                href={`/certifications/${certification.id}`}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors"
                title="Voir le certificat"
              >
                <Eye className="w-4 h-4" />
              </Link>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
