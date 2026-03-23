"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Award } from "lucide-react";

import { Container } from "@/components/Container";
import { Card } from "@/components/Card";
import { PdfViewer } from "@/components/PdfViewer";
import { readProfile } from "@/lib/readProfile";
import { useLanguage } from "@/lib/LanguageContext";
import { motion } from "framer-motion";

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
    return <div className="min-h-screen bg-surface-base pt-24 p-8 text-slate-400">{texts.notFound}</div>;
  }

  return (
    <div className="min-h-screen bg-surface-base pt-20">
      <Container className="py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-8">
            <Link
              href="/about"
              className="inline-flex items-center text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {texts.back}
            </Link>
          </div>

          <Card>
            <div className="flex flex-col gap-6 p-6">
              <div className="flex items-center gap-4">
                <Award className="w-10 h-10 text-accent-light" />
                <div>
                  <h1 className="font-display text-3xl font-bold text-white">{certification.title}</h1>
                  {certification.issuer && (
                    <p className="text-slate-400">{certification.issuer}</p>
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
                <p className="text-slate-400">{texts.missing}</p>
              )}
            </div>
          </Card>
        </motion.div>
      </Container>
    </div>
  );
}
