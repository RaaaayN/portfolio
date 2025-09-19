"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Award } from "lucide-react";

import { Container } from "@/components/Container";
import { Card } from "@/components/Card";
import { PdfViewer } from "@/components/PdfViewer";
import { readProfile } from "@/lib/readProfile";
import { useLanguage } from "@/lib/LanguageContext";

export default function CertificationPage() {
  const params = useParams<{ id: string }>();
  const { language } = useLanguage();
  const profile = readProfile(language);
  const certification = profile.certifications?.find((cert) => cert.id === params?.id);

  const texts = {
    fr: {
      back: "Retour au profil",
      title: "Certificat",
      missing: "Ce certificat n'a pas de fichier associé.",
      notFound: "Certificat introuvable",
      download: "Télécharger le PDF",
    },
    en: {
      back: "Back to profile",
      title: "Certificate",
      missing: "This certificate does not have an associated file.",
      notFound: "Certificate not found",
      download: "Download PDF",
    },
  }[language];

  if (!certification) {
    return <div className="p-8 text-gray-700">{texts.notFound}</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Container className="py-16">
        <div className="mb-8">
          <Link
            href="/about"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {texts.back}
          </Link>
        </div>

        <Card>
          <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center gap-4">
              <Award className="w-10 h-10 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{certification.title}</h1>
                {certification.issuer && (
                  <p className="text-gray-600">{certification.issuer}</p>
                )}
              </div>
            </div>

            {certification.pdf ? (
              <PdfViewer
                src={certification.pdf}
                title={`${certification.title} - ${texts.title}`}
                downloadLabel={texts.download}
              />
            ) : (
              <p className="text-gray-600">{texts.missing}</p>
            )}
          </div>
        </Card>
      </Container>
    </div>
  );
}
