import type { ChangeEvent } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const TextInput: React.FC<Props> = ({ value, placeholder, onChange }) => (
  <input
    type="text"
    className="w-full mb-4 h-12 p-4 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
    value={value}
    onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
    placeholder={placeholder}
  />
);

export default TextInput;
