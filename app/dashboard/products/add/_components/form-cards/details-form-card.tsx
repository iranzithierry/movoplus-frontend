import { FormField } from '@/components/forms/form-field';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/text-area';
import React from 'react';

export default function AddDetailsFormCard() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-3">
        <FormField id="name" type="text" name="name" label="Name" placeholder="Product name" />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" className="min-h-24" />
      </div>
    </div>
  );
}
