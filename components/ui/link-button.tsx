import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ButtonProps, buttonVariants } from './button';

export interface LinkButtonProps extends ButtonProps {
  linkTo?: string;
}

const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(({ className, variant, size, linkTo = '#', ...props }, ref) => {
  return (
    // @ts-ignore
    <Link href={linkTo ?? '#'} className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  );
});
LinkButton.displayName = 'LinkButton';

export { LinkButton, buttonVariants };
