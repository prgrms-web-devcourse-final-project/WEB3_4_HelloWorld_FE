'use client';

type Props = {
  label: string;
  value: string;
  name: string;
};

const RadioButton = ({ label, value, name }: Props) => (
  <label className="w-1/2">
    <input
      required
      className="hidden peer"
      name={name}
      type="radio"
      value={value}
    />
    <div className="border border-mono_400 rounded-md px-4 py-2 w-full text-center peer-checked:border-main">
      {label}
    </div>
  </label>
);

export default RadioButton;
