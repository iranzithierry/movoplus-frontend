import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { InputErrors } from '@/components/ui/input-errors';

interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  showPasswordToggle?: boolean;
  placeholder?: string;
  autoCapitalize?: string;
  autoComplete?: string;
  autoCorrect?: string;
  disabled?: boolean;
  errors?: string[];
  pending?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({ id, name, label, type = 'text', showPasswordToggle = false, placeholder, autoCapitalize = 'none', autoComplete, autoCorrect = 'off', disabled = false, errors, pending = false }) => {
  return (
    <div className="grid gap-1">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={name} type={type} showPasswordToggle={type === 'password' && !disabled && showPasswordToggle} invalid={errors && errors.length !== 0} placeholder={placeholder} autoCapitalize={autoCapitalize} autoComplete={autoComplete} autoCorrect={autoCorrect} disabled={disabled || pending} />
      {errors && <InputErrors errors={errors} />}
    </div>
  );
};
