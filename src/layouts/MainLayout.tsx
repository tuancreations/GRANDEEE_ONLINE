import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import Header from '../components/Header';

const MainLayout = () => {
  const { user } = useApp();
  const navigate = useNavigate();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // optional safeguard

  useEffect(() => {
    // Check user only after initial render
    if (user === null) {
      navigate('/'); // redirect to landing if no user
    } else {
      setIsCheckingAuth(false); // user exists, allow rendering
    }
  }, [user, navigate]);

  // Optional: render nothing while checking
  if (isCheckingAuth) return null;

  return (
    <>
      <Header />
      <Outlet /> {/* renders nested routes: /home, /shops, /shop/:id */}
    </>
  );
};

export default MainLayout;
