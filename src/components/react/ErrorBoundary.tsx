import React, { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }
    // Here you could also log to an error reporting service
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          className="flex flex-col items-center justify-center p-8 bg-red-950/20 border border-red-500/30 rounded-lg"
          role="alert"
        >
          <h2 className="text-xl font-bold text-red-400 mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-400 text-center mb-4">
            We're sorry, but something unexpected happened. Please try
            refreshing the page.
          </p>
          {import.meta.env.DEV && this.state.error && (
            <details className="mt-4 w-full">
              <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-300">
                Error Details (Development Only)
              </summary>
              <pre className="mt-2 p-4 bg-slate-900 rounded text-xs text-red-300 overflow-auto">
                {this.state.error.toString()}
              </pre>
            </details>
          )}
          <button
            onClick={() => window.location.reload()}
            className="mt-6 bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-6 rounded-full transition-colors duration-200"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
