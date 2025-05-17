import { Outlet } from "react-router-dom";

const Layout: React.FC = () => (
  <div className="min-h-screen bg-gray-100">
    <main className="max-w-4xl mx-auto p-4">
      <Outlet />
    </main>
  </div>
);

export default Layout;
