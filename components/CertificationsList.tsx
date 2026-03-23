import { Award, CheckCircle, Eye } from "lucide-react";
import { Card } from "./Card";
import Link from "next/link";

interface CertificationsListProps {
  certifications: {
    id: string;
    title: string;
    issuer?: string;
    date?: string;
    skills?: string[];
    pdf?: string;
  }[];
}

export function CertificationsList({ certifications }: CertificationsListProps) {
  if (!certifications || certifications.length === 0) return null;

  return (
    <Card>
      <div className="flex items-center mb-4">
        <Award className="w-6 h-6 text-accent-light mr-3" />
        <h3 className="text-xl font-semibold text-white">Certifications</h3>
      </div>

      <div className="space-y-3">
        {certifications.map((certification) => (
          <div
            key={certification.id}
            className="flex items-start justify-between gap-4"
          >
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white font-medium">
                  {certification.title}
                </p>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  {certification.issuer && (
                    <p className="text-sm text-slate-400">{certification.issuer}</p>
                  )}
                  {certification.date && (
                    <p className="text-sm text-slate-500">· {certification.date}</p>
                  )}
                </div>
                {certification.skills && certification.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {certification.skills.map((skill, i) => (
                      <span key={i} className="rounded-full bg-violet-500/20 px-2 py-0.5 text-xs text-violet-300 border border-violet-500/20 font-mono">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {certification.pdf && (
              <Link
                href={`/certifications/${certification.id}`}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.08] text-slate-400 hover:bg-white/[0.15] hover:text-white transition-colors"
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
