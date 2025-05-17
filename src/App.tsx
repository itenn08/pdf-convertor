import { Routes, Route } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";

import Layout from "./layouts";
import Home from "./pages/Home";
import Create from "./pages/Create";
import DocumentView from "./pages/DocumentView";
import NotFound from "./pages/NotFound";

const App: React.FC = () => (
  <>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/document" element={<DocumentView />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
    />
  </>
);

export default App;
