import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AppLayout } from './app/AppLayout';
import { DashboardHome } from './routes/DashboardHome';
import { QuestionnaireWizard } from './routes/QuestionnaireWizard';

export default function App() {
  return (
    <AppLayout>
      <Suspense fallback={<div className="p-6">Chargement...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/questionnaire" element={<QuestionnaireWizard />} />
        </Routes>
      </Suspense>
    </AppLayout>
  );
}
