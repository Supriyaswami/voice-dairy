import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import Loader from "../components/common/Loader";
import { useAuth } from "../context/AuthContext";

const ProtectedLayout = () => {
  const { user, isBootstrapping } = useAuth();
  const [theme, setTheme] = useState(() => localStorage.getItem("echo-diary-theme") || "light");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("echo-diary-theme", theme);
  }, [theme]);

  if (isBootstrapping) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md">
          <Loader title="Opening your diary..." subtitle="Restoring your private writing space." />
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen px-4 py-4 md:px-6">
      <div className="mx-auto flex max-w-7xl gap-4">
        <Sidebar />

        {isSidebarOpen && (
          <div className="fixed inset-0 z-30 bg-stone-950/30 lg:hidden" onClick={() => setIsSidebarOpen(false)}>
            <div className="h-full w-72 p-4" onClick={(event) => event.stopPropagation()}>
              <Sidebar />
            </div>
          </div>
        )}

        <main className="min-w-0 flex-1 space-y-4">
          <Topbar
            user={user}
            theme={theme}
            onToggleTheme={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
            onMenuToggle={() => setIsSidebarOpen(true)}
          />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;

