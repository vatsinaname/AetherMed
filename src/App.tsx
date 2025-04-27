import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Layout } from './components/Layout'
import { DashboardView } from './components/DashboardView'
import { PatientsView } from './components/PatientsView'
import { ConsultationView } from './components/ConsultationView'
import { ErrorBoundary } from './components/ErrorBoundary'
import { LoadingState } from './components/LoadingState'
import { Suspense } from 'react'

function AnimatedRoutes() {
  const location = useLocation()
  console.log('Rendering AnimatedRoutes with location:', location)

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardView />} />
          <Route path="patients" element={<PatientsView />} />
          <Route path="consultation">
            <Route path="new" element={<ConsultationView mode="new" />} />
            <Route path=":id" element={<ConsultationView mode="view" />} />
            <Route path=":id/edit" element={<ConsultationView mode="edit" />} />
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  console.log('Rendering App component')
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<LoadingState size="large" message="Loading application..." />}>
          <AnimatedRoutes />
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
