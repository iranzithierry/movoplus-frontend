import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react';

export default function AddStatusFormCard() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-3">
        <Label htmlFor="status">Status</Label>
        <Select>
          <SelectTrigger id="status" aria-label="Select status">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Active</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
