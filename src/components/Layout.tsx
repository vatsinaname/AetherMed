import { Outlet } from 'react-router-dom'
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'
import { KeyboardShortcutsDialog } from './KeyboardShortcutsDialog'
import { NotificationsButton } from './NotificationsButton'
import { AlertTriangle } from 'lucide-react'

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="min-h-[400px] flex items-center justify-center p-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h2>
        <p className="text-gray-500 mb-6">{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          Try again
        </button>
      </div>
    </div>
  )
}

export function Layout() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="h-8 w-auto"
                    src="/vite.svg"
                    alt="AetherMed"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <NotificationsButton />
                <KeyboardShortcutsDialog />
              </div>
            </div>
          </div>
        </header>

        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Outlet />
            </ErrorBoundary>
          </div>
        </main>
      </div>
    </ErrorBoundary>
  )
}