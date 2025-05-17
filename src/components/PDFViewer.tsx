import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

interface Props {
  fileUrl: string;
}

const PDFViewer: React.FC<Props> = ({ fileUrl }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const workerURL = "https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.js";

  return (
    <Worker workerUrl={workerURL}>
      <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} />
    </Worker>
  );
};

export default PDFViewer;
