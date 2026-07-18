/**
 * Service utility to capture runtime application crashes and handle error telemetry.
 */
export const reportToErrorService = (
  error: unknown,
  context?: { componentStack?: string },
) => {
  // Integration point: Connect with monitoring services (e.g., Sentry) or dispatch to your backend via Axios
  console.log("🚀 Sending error report to monitoring server...");

  // 💡 Safely extract the error message from the 'unknown' type
  const errorMessage =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : "Unknown application error";

  const errorPayload = {
    timestamp: new Date().toISOString(),
    errorMessage,
    // Using global window object safely to track the current web path
    path: typeof window !== "undefined" ? window.location.pathname : "unknown",
    componentStack: context?.componentStack || "No stack trace available",
  };

  // Locally logging the structured payload until the production ingestion pipeline is wired up
  console.error("📊 Error report payload ready for transport:", errorPayload);
};
