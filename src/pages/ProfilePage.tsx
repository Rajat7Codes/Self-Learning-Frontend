import React, { useEffect, useState } from 'react';
import API_BASE_URL from '../util/ApiConfig';
import { Gender } from '../util/Gender';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

interface UserProfile {
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string;
  gender: Gender,
  age: Number
}

const ProfilePage: React.FC = () => {
  const [user, setUserProfile] = useState<UserProfile>();
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if( !token) {
      navigate('/login');
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/profile`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          credentials: 'include' // Optional: if using cookies for auth
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data: UserProfile = await response.json();
        setUserProfile(data);
      } catch (err: any) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className=''>
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <div className="bg-white p-4 rounded shadow">
        <p className='px-2 mb-2'><strong>Username:</strong> {user?.firstName} {user?.lastName} </p>
        <p className='px-2 mb-2'><strong>Email:</strong> {user?.email}</p>
        <p className='px-2'><strong>Phone:</strong> {user?.phoneNumber}</p>
      </div>
    </div>
  );
};

export default ProfilePage;