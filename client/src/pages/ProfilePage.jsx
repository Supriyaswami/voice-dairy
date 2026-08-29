import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[0.7fr,1.3fr]">
      <Card className="space-y-5">
        <div className="flex items-center gap-4">
          {user?.profilePhoto ? (
            <img src={user.profilePhoto} alt={user.name} className="h-20 w-20 rounded-full object-cover" />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-stone-900 text-2xl font-semibold text-white dark:bg-white dark:text-stone-900">
              {user?.name?.slice(0, 1)?.toUpperCase()}
            </div>
          )}
          <div>
            <h1 className="font-display text-4xl text-stone-900 dark:text-white">{user?.name}</h1>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">{user?.email}</p>
          </div>
        </div>

        <Button variant="danger" className="w-full gap-2" onClick={handleLogout}>
          <LogOut size={16} />
          Logout
        </Button>
      </Card>

      <Card className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[1.75rem] border border-stone-200 bg-white/60 p-5 dark:border-white/10 dark:bg-white/5">
          <p className="text-xs uppercase tracking-[0.25em] text-stone-500 dark:text-stone-400">Total Diary Entries</p>
          <p className="mt-3 text-4xl font-semibold text-stone-900 dark:text-white">{user?.totalDiaries ?? 0}</p>
        </div>
        <div className="rounded-[1.75rem] border border-stone-200 bg-white/60 p-5 dark:border-white/10 dark:bg-white/5">
          <p className="text-xs uppercase tracking-[0.25em] text-stone-500 dark:text-stone-400">Account Created</p>
          <p className="mt-3 text-xl font-medium text-stone-900 dark:text-white">
            {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" }) : "Unknown"}
          </p>
        </div>
        <div className="rounded-[1.75rem] border border-stone-200 bg-white/60 p-5 dark:border-white/10 dark:bg-white/5">
          <p className="text-xs uppercase tracking-[0.25em] text-stone-500 dark:text-stone-400">Memory Promise</p>
          <p className="mt-3 text-sm leading-7 text-stone-700 dark:text-stone-200">
            Every saved entry keeps the original audio, raw transcript, and polished diary together.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;

