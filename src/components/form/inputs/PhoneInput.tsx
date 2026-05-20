'use client';

import React, { useState } from 'react';

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

export default function PhoneInput({
  id,
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  label,
  helpText,
}: InputProps) {
  const stringValue = value != null ? String(value) : '';
  const [touched, setTouched] = useState(false);

  const isValidPhone = (phone: string): boolean => {
    if (!phone) return true;
    return /^[6-9]\d{9}$/.test(phone.replace(/\s/g, ''));
  };

  const formatPhoneDisplay = (raw: string): string => {
    const digits = raw.replace(/\D/g, '').slice(0, 10);
    return digits;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
    onChange(digits || null);
  };

  const showValidationError = touched && stringValue && !isValidPhone(stringValue);
  const displayError = error || (showValidationError ? 'Enter a valid 10-digit Indian mobile number' : undefined);

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-[var(--color-text)]"
      >
        {label}
        {required && (
          <span className="ml-1 text-[var(--color-error,#ef4444)]">*</span>
        )}
      </label>

      {helpText && (
        <p className="text-xs text-[var(--color-text-secondary)]">{helpText}</p>
      )}

      <div
        className={`
          flex items-center overflow-hidden rounded-xl border
          bg-[var(--color-surface,#fff)]
          transition-all duration-200 ease-in-out
          ${
            displayError
              ? 'border-[var(--color-error,#ef4444)] ring-2 ring-[var(--color-error,#ef4444)]/20'
              : 'border-[var(--color-border,#e5e7eb)] hover:border-[var(--color-primary)]/40 focus-within:border-[var(--color-primary)] focus-within:ring-2 focus-within:ring-[var(--color-primary)]/20'
          }
          ${disabled ? 'cursor-not-allowed opacity-50' : ''}
        `}
      >
        {/* Country code prefix */}
        <div className="flex items-center gap-1.5 border-r border-[var(--color-border,#e5e7eb)] bg-[var(--color-background,#f9fafb)] px-3 py-3">
          <span className="text-base leading-none">🇮🇳</span>
          <span className="text-sm font-medium text-[var(--color-text-secondary)]">
            +91
          </span>
        </div>

        <input
          id={id}
          type="tel"
          inputMode="numeric"
          value={formatPhoneDisplay(stringValue)}
          onChange={handleChange}
          onBlur={() => setTouched(true)}
          disabled={disabled}
          required={required}
          placeholder="9876543210"
          maxLength={10}
          className="
            w-full bg-transparent px-4 py-3 text-sm
            text-[var(--color-text)]
            placeholder:text-[var(--color-text-secondary)]/50
            outline-none
          "
        />
      </div>

      {displayError && (
        <p className="flex items-center gap-1.5 text-xs text-[var(--color-error,#ef4444)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-3.5 w-3.5 flex-shrink-0"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
          {displayError}
        </p>
      )}
    </div>
  );
}
