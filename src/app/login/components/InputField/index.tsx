'use client';

import { Input } from '@heroui/react';
import { FC } from 'react';

interface InputFieldProps {
  label: string;
  name: string;
  placeholder?: string; // 힌트 문구
  type?: string; // 타입 지정 없을 경우 text 타입
  required?: boolean; // 필수 입력 없을 경우 * 표시 사라짐
  errorMessage?: string; // 에러 메시지
  width: string; // 인풋 필드(전체 박스)의 너비
  height: string; // 인풋 자체의 높이 = 한줄만 가능함
  /** 인풋 필드 박스 스타일 */
  className?: string;
  /** 각 필드 박스 하단에 줄 간격 (다음 필드와의 간격) */
  containerMarginBottom?: string;
  /** 레이블과 인풋 사이 간격 */
  labelInputGap?: string;
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
}) => (
  <div
    className="flex flex-col"
    style={{ width, marginBottom: containerMarginBottom }}
  >
    <label htmlFor={name} className="text-sm font-medium text-mono_700">
      {label}
      {required && <span className="text-main ml-1">*</span>}
    </label>

    <div style={{ marginTop: labelInputGap }}>
      <Input
        isRequired={required}
        name={name}
        placeholder={placeholder}
        type={type}
        labelPlacement="outside"
        style={{ width: '100%', height }}
        className={className}
        radius="sm"
      />
    </div>

    {errorMessage && <p className="text-xs text-main mt-1">{errorMessage}</p>}
  </div>
);

export default InputField;
