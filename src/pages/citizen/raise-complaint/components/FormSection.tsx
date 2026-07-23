import React from "react";

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function FormSection({ title, children }: FormSectionProps) {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-blue-900 to-blue-600 dark:from-slate-900 dark:to-blue-950 px-3 py-2 sm:px-5 sm:py-3 border-b border-transparent dark:border-slate-800">
        <h2 className="text-white font-semibold text-xs sm:text-sm tracking-wide uppercase">
          {title}
        </h2>
      </div>
      <div className="p-3 sm:p-5 space-y-4">{children}</div>
    </div>
  );
}
