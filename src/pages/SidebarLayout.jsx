import { useState, useEffect } from "react";
import { useNavigate, useLocation, Routes, Route, Navigate } from "react-router-dom";

export default function SidebarLayout({ title = "Sidebar", menuItems = [], defaultRoute }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Dynamically detect base path like "faculty" or "company"
  const basePath = menuItems[0]?.path.split("/")[1] || "";

  useEffect(() => {
    if (window.innerWidth < 640) {
      document.body.style.overflow = isOpen ? "hidden" : "auto";
    }
  }, [isOpen]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-blue-600 text-white flex flex-col
          transition-all duration-300 z-50
          ${isOpen ? "w-full sm:w-64" : "md:w-16 w-12 "}
        `}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-2 border-b border-blue-500">
          {isOpen ? (
            <>
              <h1 className="font-bold text-white">{title}</h1>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded hover:bg-blue-500 transition-colors"
              >
                ✕
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsOpen(true)}
              className=" p-2 rounded hover:bg-blue-500 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="md:h-6 md:w-6 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Menu */}
        <nav className="flex flex-col mt-6 space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                navigate(item.path); // Navigate to absolute path
                if (window.innerWidth < 640) setIsOpen(false);
              }}
              className={`flex items-center p-2 rounded-lg transition-colors duration-300 w-full text-left
                ${location.pathname === item.path ? "bg-blue-700" : "hover:bg-blue-500"}
              `}
            >
              <div className="flex-shrink-0 md:w-10 md:h-10 w-8 h-8  flex items-center justify-center bg-blue-700 rounded-md">
                {item.icon}
              </div>
              {isOpen && <span className="ml-4 text-white font-medium">{item.name}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main
        className={`flex-1 md:p-6 p-2 bg-gray-50 min-h-screen overflow-y-auto transition-all duration-300 ${
          isOpen ? "ml-64" : "md:ml-16 ml-12"
        }`}
      >
        <Routes>
          {/* Default Redirect */}
          {defaultRoute && <Route index element={<Navigate to={defaultRoute} replace />} />}

          {/* Render menu routes dynamically */}
          {menuItems.map((item, index) => {
            const relativePath = item.path.replace(new RegExp(`^/${basePath}/`), "");
            return <Route key={index} path={relativePath} element={item.component} />;
          })}
        </Routes>
      </main>
    </div>
  );
}
