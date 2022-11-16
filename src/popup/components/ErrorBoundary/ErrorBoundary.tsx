import { AxiosError } from "axios";
import { Component, ErrorInfo, ReactNode } from "react";
import AuthFallback from "@/popup/components/Fallback/Auth/AuthFallback";
import UnexpectedFallback from "@/popup/components/Fallback/Unexpected/UnexpectedFallback";
import * as Sentry from "@sentry/browser";

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorType: null | string;
}

const ERROR_TYPES = {
  Auth: "AUTH",
  Unexpected: "UNEXPECTED",
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorType: null,
    };
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    if ((error as AxiosError)?.response?.status === 401)
      return { hasError: true, errorType: ERROR_TYPES.Auth };
    return { hasError: true, errorType: ERROR_TYPES.Unexpected };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { errorType } = this.state;
    console.error(error, errorInfo);

    if (errorType === ERROR_TYPES.Unexpected && process.env.NODE_ENV === "production") {
      Sentry.captureException(error, { extra: { errorInfo } });
    }
  }

  public render() {
    const { hasError, errorType } = this.state;
    const { children } = this.props;

    if (hasError) {
      if (errorType === ERROR_TYPES.Auth) return <AuthFallback />;
      return <UnexpectedFallback />;
    }

    return children;
  }
}

export default ErrorBoundary;
