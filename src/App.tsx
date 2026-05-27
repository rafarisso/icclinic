import { Component, lazy, Suspense, type ComponentType, type ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";

const CHUNK_RELOAD_KEY = "ic-clinic-chunk-reload-attempted";

function isChunkLoadError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);

  return (
    message.includes("Failed to fetch dynamically imported module") ||
    message.includes("Importing a module script failed") ||
    message.includes("error loading dynamically imported module") ||
    message.includes("Expected a JavaScript module script")
  );
}

function lazyWithRefresh<T extends ComponentType>(
  importer: () => Promise<{ default: T }>
) {
  return lazy(async () => {
    try {
      const module = await importer();
      window.sessionStorage.removeItem(CHUNK_RELOAD_KEY);
      return module;
    } catch (error) {
      if (isChunkLoadError(error) && !window.sessionStorage.getItem(CHUNK_RELOAD_KEY)) {
        window.sessionStorage.setItem(CHUNK_RELOAD_KEY, "true");
        window.location.reload();
        return new Promise<never>(() => {});
      }

      throw error;
    }
  });
}

class RouteErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="space-y-4 rounded-ic-xl bg-ic-cream-light p-5 text-center shadow-ic-card">
          <h1 className="font-serif text-[28px] font-semibold leading-8 text-ic-black">
            Atualização disponível
          </h1>
          <p className="text-[13px] leading-5 text-ic-gray-600">
            Recarregue o app para abrir a versão mais recente da IC Clinic.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="gold-sheen inline-flex min-h-11 items-center justify-center rounded-ic-md px-5 text-sm font-semibold text-ic-white shadow-ic-card"
          >
            Recarregar app
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const HomePage = lazyWithRefresh(() =>
  import("@/pages/HomePage").then((module) => ({ default: module.HomePage }))
);
const ProceduresPage = lazyWithRefresh(() =>
  import("@/pages/ProceduresPage").then((module) => ({
    default: module.ProceduresPage
  }))
);
const ProcedureDetailPage = lazyWithRefresh(() =>
  import("@/pages/ProcedureDetailPage").then((module) => ({
    default: module.ProcedureDetailPage
  }))
);
const SchedulePage = lazyWithRefresh(() =>
  import("@/pages/SchedulePage").then((module) => ({ default: module.SchedulePage }))
);
const JourneyPage = lazyWithRefresh(() =>
  import("@/pages/JourneyPage").then((module) => ({ default: module.JourneyPage }))
);
const DiaryPage = lazyWithRefresh(() =>
  import("@/pages/DiaryPage").then((module) => ({ default: module.DiaryPage }))
);
const ProfilePage = lazyWithRefresh(() =>
  import("@/pages/ProfilePage").then((module) => ({ default: module.ProfilePage }))
);
const SimulationUploadPage = lazyWithRefresh(() =>
  import("@/pages/SimulationUploadPage").then((module) => ({
    default: module.SimulationUploadPage
  }))
);
const SimulationResultPage = lazyWithRefresh(() =>
  import("@/pages/SimulationResultPage").then((module) => ({
    default: module.SimulationResultPage
  }))
);
const SimulationComparePage = lazyWithRefresh(() =>
  import("@/pages/SimulationComparePage").then((module) => ({
    default: module.SimulationComparePage
  }))
);
const AdminDashboardPage = lazyWithRefresh(() =>
  import("@/pages/AdminDashboardPage").then((module) => ({
    default: module.AdminDashboardPage
  }))
);
const AdminSchedulePage = lazyWithRefresh(() =>
  import("@/pages/AdminSchedulePage").then((module) => ({
    default: module.AdminSchedulePage
  }))
);
const AdminPatientsPage = lazyWithRefresh(() =>
  import("@/pages/AdminPatientsPage").then((module) => ({
    default: module.AdminPatientsPage
  }))
);
const AdminPatientProfilePage = lazyWithRefresh(() =>
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
    <RouteErrorBoundary>
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
    </RouteErrorBoundary>
  );
}
