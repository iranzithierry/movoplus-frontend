import * as React from 'react';

import { cn } from '@/lib/utils';
import { Textarea as HeadlessTextarea } from '@headlessui/react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, invalid = false, ...props }, ref) => {
  return <HeadlessTextarea className={cn(`flex border border-input bg-transparent px-3 py-1  w-full focus-visible:outline-none rounded-md placeholder:text-muted-foreground focus:ring-1 focus:ring-inset focus:ring-ring ${invalid && 'ring-red-500 focus-visible:ring-red-500'}`, className)} ref={ref} {...props} />;
});
Textarea.displayName = 'Textarea';

export { Textarea };
