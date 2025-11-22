import type { Section } from "@/types";

interface SectionProps extends Section {
  children?: React.ReactNode;
}

export default function Section({
  id,
  title,
  subtitle,
  content,
  children,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`py-24 lg:py-32 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {subtitle && (
              <p className="text-lg text-gray-600 mb-4">{subtitle}</p>
            )}
            {title && (
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-light text-gray-900 tracking-tight">
                {title}
              </h2>
            )}
          </div>
        )}
        {content || children}
      </div>
    </section>
  );
}
