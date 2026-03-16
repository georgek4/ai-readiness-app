import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './components/pages/Home';
import ProfileSetup from './components/assessment/ProfileSetup';
import AssessmentEngine from './components/assessment/AssessmentEngine';
import Results from './components/results/Results';
import OrgDashboard from './components/dashboard/OrgDashboard';
import DepartmentExplorer from './components/pages/DepartmentExplorer';
import DataManagement from './components/admin/DataManagement';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="setup" element={<ProfileSetup />} />
          <Route path="assessment" element={<AssessmentEngine />} />
          <Route path="results/:id" element={<Results />} />
          <Route path="dashboard" element={<OrgDashboard />} />
          <Route path="departments" element={<DepartmentExplorer />} />
          <Route path="data" element={<DataManagement />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
