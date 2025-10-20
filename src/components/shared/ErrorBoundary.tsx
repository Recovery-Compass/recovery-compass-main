
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
    
    // Track error for analytics
    trackEvent('error_boundary_triggered', {
      error_message: error.message,
      error_stack: error.stack,
      component_stack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
    });

    // Log error for debugging
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-navy flex items-center justify-center p-4">
          <div className="bg-navy-light border border-bronze/20 rounded-lg p-8 max-w-md w-full text-center">
            <AlertCircle className="w-16 h-16 text-bronze mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-moonlight mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-moonlight/80 mb-6">
              We encountered an unexpected error. This has been reported to our team.
            </p>
            
            {import.meta.env.DEV && this.state.error && (
              <details className="mb-6 text-left bg-navy border border-bronze/10 rounded p-4">
                <summary className="text-bronze cursor-pointer mb-2">
                  Error Details (Development)
                </summary>
                <pre className="text-xs text-moonlight/60 overflow-auto">
                  {this.state.error.message}
                  {'\n\n'}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
            
            <div className="flex gap-3 justify-center">
              <Button 
                onClick={this.handleReset}
                variant="ghost"
                className="text-moonlight border-bronze/20"
              >
                Try Again
              </Button>
              <Button 
                onClick={this.handleReload}
                variant="default"
                className="bg-bronze text-navy flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Reload Page
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
