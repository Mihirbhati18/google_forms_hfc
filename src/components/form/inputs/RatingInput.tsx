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

export default function RatingInput({
  id,
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  label,
  helpText,
}: InputProps) {
  const numericValue = value != null ? Number(value) : 0;
  const [hoveredStar, setHoveredStar] = useState<number>(0);

  const handleStarClick = (star: number) => {
    if (disabled) return;
    // Toggle off if clicking the same star
    onChange(numericValue === star ? null : star);
  };

  const displayValue = hoveredStar || numericValue;

  const ratingLabels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

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

      <div className="flex items-center gap-1" role="radiogroup" aria-label={label}>
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= displayValue;
          const starId = `${id}-star-${star}`;

          return (
            <button
              key={star}
              id={starId}
              type="button"
              role="radio"
              aria-checked={star === numericValue}
              aria-label={`${star} star${star > 1 ? 's' : ''} - ${ratingLabels[star]}`}
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => !disabled && setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
              disabled={disabled}
              className={`
                group relative p-1
                transition-transform duration-150 ease-out
                ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-110 active:scale-95'}
              `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className={`
                  h-8 w-8 transition-colors duration-200
                  ${
                    isFilled
                      ? 'fill-amber-400 text-amber-400'
                      : 'fill-transparent text-[var(--color-border,#d1d5db)] group-hover:text-amber-300'
                  }
                `}
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
            </button>
          );
        })}

        {/* Rating label */}
        {displayValue > 0 && (
          <span className="ml-2 text-sm font-medium text-amber-600">
            {ratingLabels[displayValue]}
          </span>
        )}
      </div>

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
