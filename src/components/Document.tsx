import type { IDocument } from "../types";
import { truncateString } from "../utils/truncateString";

import pdfIcon from "../assets/pdf_icon.png";

interface Props {
  data: IDocument;
  onSelect: (id: string) => void;
}

const Document: React.FC<Props> = ({ data, onSelect }) => {
  const handleSelectDocument = () => {
    if (!data?.id) {
      return;
    }

    onSelect(data?.id);
  };

  return (
    <div className="w-[150px] h-100 bg-white rounded-lg shadow-md flex flex-col items-center justify-between p-2">
      <img
        src={pdfIcon}
        alt={data?.title}
        className="w-[64px] h-100 cursor-pointer"
        onClick={handleSelectDocument}
      />

      <p className="text-sm font-semibold text-gray-800 mt-[16px] mb-[8px] truncate w-full text-center">
        {truncateString(data?.title) || "Document"}
      </p>

      <p className="text-xs text-center mt-[0px] mb-[8px] text-gray-500">
        {data?.timestamp}
      </p>
      <button
        className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded hover:bg-blue-200"
        onClick={handleSelectDocument}
      >
        View
      </button>
    </div>
  );
};

export default Document;
