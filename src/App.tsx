import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";

const HomePage = lazy(() =>
  import("@/pages/HomePage").then((module) => ({ default: module.HomePage }))
);
const ProceduresPage = lazy(() =>
  import("@/pages/ProceduresPage").then((module) => ({
    default: module.ProceduresPage
  }))
);
const SchedulePage = lazy(() =>
  import("@/pages/SchedulePage").then((module) => ({ default: module.SchedulePage }))
);
const JourneyPage = lazy(() =>
  import("@/pages/JourneyPage").then((module) => ({ default: module.JourneyPage }))
);
const DiaryPage = lazy(() =>
  import("@/pages/DiaryPage").then((module) => ({ default: module.DiaryPage }))
);
const ProfilePage = lazy(() =>
  import("@/pages/ProfilePage").then((module) => ({ default: module.ProfilePage }))
);

function RouteFallback() {
  return (
    <div className="space-y-4 pt-2">
      <div className="h-9 w-48 rounded-ic-md skeleton" />
      <div className="h-40 rounded-ic-xl skeleton" />
      <div className="h-28 rounded-ic-lg skeleton" />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          path="/"
          element={
            <Suspense fallback={<RouteFallback />}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="/procedimentos"
          element={
            <Suspense fallback={<RouteFallback />}>
              <ProceduresPage />
            </Suspense>
          }
        />
        <Route
          path="/agendar"
          element={
            <Suspense fallback={<RouteFallback />}>
              <SchedulePage />
            </Suspense>
          }
        />
        <Route
          path="/jornada"
          element={
            <Suspense fallback={<RouteFallback />}>
              <JourneyPage />
            </Suspense>
          }
        />
        <Route
          path="/diario"
          element={
            <Suspense fallback={<RouteFallback />}>
              <DiaryPage />
            </Suspense>
          }
        />
        <Route
          path="/perfil"
          element={
            <Suspense fallback={<RouteFallback />}>
              <ProfilePage />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
