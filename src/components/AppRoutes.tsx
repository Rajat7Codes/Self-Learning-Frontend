// routes/AppRoutes.tsx
import { Routes, Route } from 'react-router-dom';
import { AppLayout } from './AppLayout';
import ProgressPage from '../pages/ProgressPage';
import TasksPage from '../pages/TasksPage';
import ProfilePage from '../pages/ProfilePage';
import LoginPage from '../pages/LoginPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<TasksPage />} />
        <Route path="path" element={<ProgressPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="login" element={<LoginPage />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
