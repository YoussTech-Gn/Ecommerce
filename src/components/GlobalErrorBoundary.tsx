import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { useEffect } from "react";
import { reportToErrorService } from "@/utils/errorServices";
import NoFoundPage from "@/pages/404-page/NoFound";

/**
 * GlobalErrorBoundary Component
 * Catches all runtime routing and rendering errors, logs them to the telemetry
 * service, and presents a graceful fallback UI to the user.
 */
export default function GlobalErrorBoundary() {
  const errorPath = useRouteError();

  useEffect(() => {
    // 💡 Execute the telemetry service strictly as a side-effect function call
    if (errorPath) {
      reportToErrorService(errorPath, {
        componentStack: "Captured via Route Boundary",
      });
    }
  }, [errorPath]);

  // Handle standard 404 Route Not Found errors gracefully
  if (isRouteErrorResponse(errorPath) && errorPath.status === 404) {
    return <NoFoundPage />;
  }

  // Fallback structural UI for generic application crashes
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
      <div className="max-w-md w-full bg-white border border-slate-200 p-8 rounded-xl shadow-sm">
        <h1 className="text-xl font-bold text-slate-900 mb-2">
          Something went wrong
        </h1>
        <p className="text-sm text-slate-500 mb-6">
          An unexpected application errorPath occurred. Our team has been
          notified.
        </p>
        <button
          onClick={() => window.location.assign("/")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Return to Homepage
        </button>
      </div>
    </div>
  );
}
