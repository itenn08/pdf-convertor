interface Props {
  onClick: () => void;
  disabled: boolean;
}

const ConvertButton: React.FC<Props> = ({ onClick, disabled }) => (
  <button
    className="px-6 mt-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400"
    onClick={onClick}
    disabled={disabled}
  >
    Convert to PDF
  </button>
);

export default ConvertButton;
