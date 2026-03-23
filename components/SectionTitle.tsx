interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}

export function SectionTitle({ title, subtitle, align = "center" }: SectionTitleProps) {
  return (
    <div className={`${align === "center" ? "text-center" : "text-left"} mb-12`}>
      <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight gradient-text">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-400 text-lg mt-3 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
