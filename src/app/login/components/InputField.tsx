'use client';

import { Input } from '@heroui/react';
import { FC, ChangeEvent, FocusEvent } from 'react';

interface InputFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  errorMessage?: string;
  width: string;
  height: string;
  className?: string;
  containerMarginBottom?: string;
  labelInputGap?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
}

const InputField: FC<InputFieldProps> = ({
  label,
  name,
  placeholder = '',
  type = 'text',
  required = false,
  errorMessage = '',
  width,
  height,
  className = '',
  containerMarginBottom = '',
  labelInputGap = '',
  value,
  onChange,
  onFocus,
  readOnly,
}) => (
  <div
    className="flex flex-col"
    style={{ width, marginBottom: containerMarginBottom }}
  >
    <label className="text-sm font-medium text-mono_700" htmlFor={name}>
      {label}
      {required && <span className="text-main ml-1">*</span>}
    </label>

    <div style={{ marginTop: labelInputGap }}>
      <Input
        className={className}
        isRequired={required}
        labelPlacement="outside"
        name={name}
        placeholder={placeholder}
        radius="sm"
        readOnly={readOnly}
        style={{ width: '100%', height }}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
      />
    </div>

    {errorMessage && <p className="text-xs text-main mt-1">{errorMessage}</p>}
  </div>
);

export default InputField;
