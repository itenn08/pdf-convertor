import type { ChangeEvent } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const TextArea: React.FC<Props> = ({ value, placeholder, onChange }) => (
  <textarea
    className="w-full h-40 p-4 bg-white border border-gray-200 rounded-lg shadow-sm resize-none text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
    value={value}
    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
    placeholder={placeholder}
  />
);

export default TextArea;
