import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import TranscriptPage from "./pages/TranscriptPage";
import GeneratedDiaryPage from "./pages/GeneratedDiaryPage";
import DiaryListPage from "./pages/DiaryListPage";
import DiaryDetailPage from "./pages/DiaryDetailPage";
import CalendarPage from "./pages/CalendarPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" replace />} />
        <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/" replace />} />
      </Route>

      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/transcript" element={<TranscriptPage />} />
        <Route path="/generated-diary" element={<GeneratedDiaryPage />} />
        <Route path="/diaries" element={<DiaryListPage />} />
        <Route path="/diaries/:id" element={<DiaryDetailPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;

