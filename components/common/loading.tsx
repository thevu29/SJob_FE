import type React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The size of the loading spinner
   * @default "default"
   */
  size?: 'sm' | 'default' | 'lg' | 'xl';

  /**
   * The variant of the loading spinner
   * @default "default"
   */
  variant?: 'default' | 'primary' | 'secondary' | 'ghost';

  /**
   * Optional text to display alongside the spinner
   */
  text?: string;

  /**
   * Whether to center the loading spinner
   * @default false
   */
  centered?: boolean;

  /**
   * Whether to show the loading spinner in a full page overlay
   * @default false
   */
  fullPage?: boolean;
}

export function Loading({
  size = 'default',
  variant = 'default',
  text,
  centered = false,
  fullPage = false,
  className,
  ...props
}: LoadingProps) {
  // Size classes
  const sizeClasses = {
    sm: 'h-4 w-4',
    default: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  };

  // Variant classes
  const variantClasses = {
    default: 'text-muted-foreground',
    primary: 'text-primary',
    secondary: 'text-secondary-foreground',
    ghost: 'text-muted-foreground/50'
  };

  // Container classes
  const containerClasses = cn(
    'flex items-center gap-2',
    centered && 'justify-center',
    fullPage && 'fixed inset-0 z-50 bg-background/40 backdrop-blur-md',
    className
  );

  // Spinner classes
  const spinnerClasses = cn(
    'animate-spin',
    sizeClasses[size],
    variantClasses[variant]
  );

  // Text classes
  const textClasses = cn(
    'text-foreground',
    size === 'sm' && 'text-sm',
    size === 'lg' && 'text-lg',
    size === 'xl' && 'text-xl'
  );

  return (
    <div className={containerClasses} {...props}>
      <div
        className={fullPage ? 'flex flex-col items-center justify-center' : ''}
      >
        <Loader2 className={spinnerClasses} />
        {text && <span className={textClasses}>{text}</span>}
      </div>
    </div>
  );
}

/**
 * A full page loading overlay
 */
export function LoadingPage({
  text = 'Loading...',
  ...props
}: Omit<LoadingProps, 'fullPage'>) {
  return (
    <Loading
      fullPage
      centered
      size='lg'
      variant='primary'
      text={text}
      {...props}
    />
  );
}

/**
 * A centered loading spinner
 */
export function LoadingSpinner({
  size = 'default',
  variant = 'default',
  className
  //   ...props
}: Omit<LoadingProps, 'text' | 'centered' | 'fullPage'>) {
  return (
    <Loader2
      className={cn(
        'animate-spin',
        {
          'h-4 w-4': size === 'sm',
          'h-6 w-6': size === 'default',
          'h-8 w-8': size === 'lg',
          'h-12 w-12': size === 'xl'
        },
        {
          'text-muted-foreground': variant === 'default',
          'text-primary': variant === 'primary',
          'text-secondary-foreground': variant === 'secondary',
          'text-muted-foreground/50': variant === 'ghost'
        },
        className
      )}
      //   {...props}
    />
  );
}

/**
 * A loading button state
 */
export function LoadingButton({
  size = 'sm',
  className,
  ...props
}: Omit<LoadingProps, 'text' | 'centered' | 'fullPage'>) {
  return (
    <LoadingSpinner size={size} className={cn('mr-2', className)} {...props} />
  );
}

/**
 * A loading skeleton
 */
export function LoadingSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('bg-muted animate-pulse rounded-md', className)}
      {...props}
    />
  );
}
