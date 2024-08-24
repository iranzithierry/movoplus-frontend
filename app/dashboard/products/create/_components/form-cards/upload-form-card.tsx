'use client';

import Image from 'next/image';
import { Upload } from 'lucide-react';
export default function UploadeImageFormCard() {
  return (
    <div className="grid gap-2">
      <Image alt="Product image" className="aspect-square w-full rounded-md object-cover" height="300" src="/images/placeholder.svg" width="300" />
      <div className="grid grid-cols-3 gap-2">
        <button>
          <Image alt="Product image" className="aspect-square w-full rounded-md object-cover" height="84" src="/images/placeholder.svg" width="84" />
        </button>
        <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
          <Upload className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Upload</span>
        </button>
      </div>
    </div>
  );
}
