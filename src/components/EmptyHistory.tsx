import { useNavigate } from "react-router-dom";

const EmptyHistory: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateNewDocument = () => {
    navigate("/create");
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] bg-gray-50 rounded-lg p-8 text-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        You haven't created any PDF files yet
      </h2>
      <p className="text-gray-500 mb-6 max-w-md">
        Start creating your first PDF document now. It's quick and easy!
      </p>
      <button
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        onClick={handleCreateNewDocument}
      >
        Create
      </button>
    </div>
  );
};

export default EmptyHistory;
