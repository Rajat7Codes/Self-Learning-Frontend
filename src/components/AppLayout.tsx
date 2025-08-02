import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export const AppLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-full">
      <nav className="w-64 bg-gray-800 text-white p-4 flex flex-col">
        <h2 className="flex-none text-2xl font-bold mb-6 text-center">Learning Path</h2>
        <ul className="grow justify-items-stretch content-center">
          <li className='p-4 border-1 border-black bg-gray-900 mb-2'>
            <NavLink to="/" className={({ isActive }) => isActive ? 'font-bold' : ''}>Your Tasks</NavLink>
          </li>
          <li className='p-4 border-1 border-black bg-gray-900 mb-2'>
            <NavLink to="/path" className={({ isActive }) => isActive ? 'font-bold' : ''}>Progress</NavLink>
          </li>
          <li className='p-4 border-1 border-black bg-gray-900'>
            <NavLink to="/profile" className={({ isActive }) => isActive ? 'font-bold' : ''}>Your Profile</NavLink>
          </li>
        </ul> 
        <button
          onClick={handleLogout}
          className="flex-none w-full p-2 border-2 border-white-50">
          Logout
        </button>
      </nav>

      <main className="flex-1 bg-slate-200 min-h-screen p-4">
        <Outlet />
      </main>
    </div>
  );
};