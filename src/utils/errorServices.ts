import type React from "react";

/**
 * Service utility to capture runtime application crashes and handle error telemetry.
 */
export const reportToErrorService = (
  error: unknown,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  location: any,
  errorInfo: React.ErrorInfo | undefined,
) => {
  // Integration point: Connect with monitoring services (e.g., Sentry) or dispatch to your backend via Axios
  console.log("🚀 Sending error report to monitoring server...");

  const errorPayload = {
    timestamp: new Date().toISOString(),
    errorMessage: error instanceof Error ? error.message : String(error),
    path: location?.pathname || "unknown",
    componentStack: errorInfo?.componentStack || "No stack trace available",
  };

  // Locally logging the structured payload until the production ingestion pipeline is wired up
  console.error("📊 Error report payload ready for transport:", errorPayload);
};
