import { useNavigate } from "react-router-dom";
import Document from "./Document";
import type { IDocument } from "../types";

interface IProps {
  documents: IDocument[];
  onClearStorage: () => void;
}

const HistoryList: React.FC<IProps> = ({ documents, onClearStorage }) => {
  const navigate = useNavigate();

  const handleViewDocument = (id: string) => {
    navigate(`/document?id=${id}`);
  };

  const handleCreateNewDocument = () => {
    navigate("/create");
  };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-gray-50 p-4 h-[60vh]">
        <div className="max-w-7xl mx-auto h-[50vh]">
          <div className="h-full p-4 overflow-y-auto grid justify-items-center grid-cols-2 gap-[16px]  sm:grid-cols-3  md:mt-8 md:grid-cols-3 md:gap-5 lg:grid-cols-5">
            {documents.map((item) => (
              <Document
                data={item}
                onSelect={handleViewDocument}
                key={item?.id}
              />
            ))}
          </div>
        </div>
      </div>
      <button
        className="px-3 py-3 mt-4 flex bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-colors"
        onClick={handleCreateNewDocument}
      >
        Create a new PDF
      </button>
      <button
        className="px-3 py-3 mt-4 flex bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 transition-colors"
        onClick={onClearStorage}
      >
        Clear all my data
      </button>
    </div>
  );
};

export default HistoryList;
