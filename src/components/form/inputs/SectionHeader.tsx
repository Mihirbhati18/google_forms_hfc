'use client';

import React from 'react';

interface InputProps {
  id: string;
  value: string | string[] | number | null;
  onChange: (value: string | string[] | number | null) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  label: string;
  helpText?: string;
  options?: string[];
}

export default function SectionHeader({
  id,
  label,
  helpText,
}: InputProps) {
  return (
    <div id={id} className="space-y-2 pb-2 pt-4">
      <h3 className="text-lg font-bold text-[var(--color-text)]">
        {label}
      </h3>

      {helpText && (
        <p className="text-sm text-[var(--color-text-secondary)]">{helpText}</p>
      )}

      {/* Decorative divider */}
      <div className="pt-1">
        <div className="flex items-center gap-2">
          <div className="h-0.5 w-8 rounded-full bg-[var(--color-primary)]" />
          <div className="h-0.5 flex-1 rounded-full bg-[var(--color-border,#e5e7eb)]" />
        </div>
      </div>
    </div>
  );
}
