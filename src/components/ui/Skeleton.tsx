interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
  variant?: 'text' | 'circle' | 'card' | 'custom';
}

export default function Skeleton({
  width,
  height,
  className = '',
  variant = 'custom',
}: SkeletonProps) {
  const variantClasses = {
    text: 'h-4 rounded-md',
    circle: 'rounded-full',
    card: 'h-48 rounded-2xl',
    custom: 'rounded-xl',
  };

  return (
    <div
      className={`
        animate-pulse bg-border/50
        ${variantClasses[variant]}
        ${className}
      `}
      style={{
        width: width || (variant === 'circle' ? '48px' : '100%'),
        height: height || (variant === 'circle' ? '48px' : undefined),
      }}
    />
  );
}
