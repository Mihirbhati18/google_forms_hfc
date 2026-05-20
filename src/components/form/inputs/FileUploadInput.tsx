'use client';

import React, { useRef, useState, useCallback } from 'react';

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

export default function FileUploadInput({
  id,
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  label,
  helpText,
}: InputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileName = value != null ? String(value) : '';

  const handleFileSelect = (file: File | null) => {
    if (file) {
      onChange(file.name);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFileSelect(file);
  };

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) setIsDragging(true);
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      if (disabled) return;
      const file = e.dataTransfer.files?.[0] || null;
      handleFileSelect(file);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [disabled]
  );

  const handleRemove = () => {
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-[var(--color-text)]">
        {label}
        {required && (
          <span className="ml-1 text-[var(--color-error,#ef4444)]">*</span>
        )}
      </label>

      {helpText && (
        <p className="text-xs text-[var(--color-text-secondary)]">{helpText}</p>
      )}

      <input
        ref={fileInputRef}
        id={id}
        type="file"
        onChange={handleInputChange}
        disabled={disabled}
        className="sr-only"
      />

      {!fileName ? (
        /* Drop zone */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !disabled && fileInputRef.current?.click()}
          role="button"
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          className={`
            flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed
            px-6 py-8
            transition-all duration-200 ease-in-out
            ${
              isDragging
                ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
                : error
                  ? 'border-[var(--color-error,#ef4444)]/50 bg-[var(--color-error,#ef4444)]/[0.02]'
                  : 'border-[var(--color-border,#d1d5db)] bg-[var(--color-surface,#fff)] hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-primary)]/[0.02]'
            }
            ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
          `}
        >
          {/* Upload icon */}
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary)]/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 text-[var(--color-primary)]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
          </div>

          <div className="text-center">
            <p className="text-sm font-medium text-[var(--color-text)]">
              <span className="text-[var(--color-primary)]">Click to upload</span>{' '}
              or drag and drop
            </p>
            <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
              Any file type supported
            </p>
          </div>
        </div>
      ) : (
        /* File selected display */
        <div
          className={`
            flex items-center gap-3 rounded-xl border px-4 py-3
            border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5
          `}
        >
          {/* File icon */}
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)]/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5 text-[var(--color-primary)]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
          </div>

          <span className="min-w-0 flex-1 truncate text-sm font-medium text-[var(--color-text)]">
            {fileName}
          </span>

          {/* Remove button */}
          <button
            type="button"
            onClick={handleRemove}
            disabled={disabled}
            className="
              flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg
              text-[var(--color-text-secondary)]
              transition-colors duration-150
              hover:bg-[var(--color-error,#ef4444)]/10 hover:text-[var(--color-error,#ef4444)]
            "
            aria-label="Remove file"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4.5 w-4.5"
            >
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>
      )}

      {error && (
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
          {error}
        </p>
      )}
    </div>
  );
}
