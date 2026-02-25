import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';

// Lazy loading pages for better performance
const Home = React.lazy(() => import('./pages/Home'));
const TypesOfCancer = React.lazy(() => import('./pages/TypesOfCancer'));
const StagesOfCancer = React.lazy(() => import('./pages/StagesOfCancer'));
const RiskAssessment = React.lazy(() => import('./pages/RiskAssessment'));
const ThankYou = React.lazy(() => import('./pages/ThankYou'));
const AdminLogin = React.lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));

// Loading fallback component
const PageLoader = () => (
  <div className="flex h-[50vh] items-center justify-center">
    <div className="w-10 h-10 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <React.Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="types" element={<TypesOfCancer />} />
          <Route path="stages" element={<StagesOfCancer />} />
          <Route path="assessment" element={<RiskAssessment />} />
          <Route path="thank-you" element={<ThankYou />} />
          <Route path="admin" element={<AdminLogin />} />
          <Route path="admin/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
              <h1 className="text-4xl font-bold">404</h1>
              <p className="text-[var(--color-muted)]">Page not found</p>
            </div>
          } />
        </Route>
      </Routes>
    </React.Suspense>
  );
}

export default App;
