import React, { useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProgressPage: React.FC = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if( !token) {
      navigate('/login');
    }
  });

  return (
    <div className='flex flex-row h-full'> <p className='text-xl content-center w-full text-center'> Yet to be designed </p> </div>
  )
};

export default ProgressPage;