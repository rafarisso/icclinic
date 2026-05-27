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
const ProcedureDetailPage = lazy(() =>
  import("@/pages/ProcedureDetailPage").then((module) => ({
    default: module.ProcedureDetailPage
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
const SimulationUploadPage = lazy(() =>
  import("@/pages/SimulationUploadPage").then((module) => ({
    default: module.SimulationUploadPage
  }))
);
const SimulationResultPage = lazy(() =>
  import("@/pages/SimulationResultPage").then((module) => ({
    default: module.SimulationResultPage
  }))
);
const SimulationComparePage = lazy(() =>
  import("@/pages/SimulationComparePage").then((module) => ({
    default: module.SimulationComparePage
  }))
);
const AdminDashboardPage = lazy(() =>
  import("@/pages/AdminDashboardPage").then((module) => ({
    default: module.AdminDashboardPage
  }))
);
const AdminSchedulePage = lazy(() =>
  import("@/pages/AdminSchedulePage").then((module) => ({
    default: module.AdminSchedulePage
  }))
);
const AdminPatientsPage = lazy(() =>
  import("@/pages/AdminPatientsPage").then((module) => ({
    default: module.AdminPatientsPage
  }))
);
const AdminPatientProfilePage = lazy(() =>
  import("@/pages/AdminPatientProfilePage").then((module) => ({
    default: module.AdminPatientProfilePage
  }))
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
          path="/procedimentos/:id"
          element={
            <Suspense fallback={<RouteFallback />}>
              <ProcedureDetailPage />
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
        <Route
          path="/simulacao-ia"
          element={
            <Suspense fallback={<RouteFallback />}>
              <SimulationUploadPage />
            </Suspense>
          }
        />
        <Route
          path="/simulacao-ia/resultado"
          element={
            <Suspense fallback={<RouteFallback />}>
              <SimulationResultPage />
            </Suspense>
          }
        />
        <Route
          path="/simulacao-ia/comparacao"
          element={
            <Suspense fallback={<RouteFallback />}>
              <SimulationComparePage />
            </Suspense>
          }
        />
        <Route
          path="/admin"
          element={
            <Suspense fallback={<RouteFallback />}>
              <AdminDashboardPage />
            </Suspense>
          }
        />
        <Route
          path="/admin/agenda"
          element={
            <Suspense fallback={<RouteFallback />}>
              <AdminSchedulePage />
            </Suspense>
          }
        />
        <Route
          path="/admin/pacientes"
          element={
            <Suspense fallback={<RouteFallback />}>
              <AdminPatientsPage />
            </Suspense>
          }
        />
        <Route
          path="/admin/pacientes/:id"
          element={
            <Suspense fallback={<RouteFallback />}>
              <AdminPatientProfilePage />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
