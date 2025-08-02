// File: App.tsx
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './components/AppRoutes';

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
