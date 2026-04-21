import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import MarketplaceFooter from '../components/MarketplaceFooter';

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <MarketplaceFooter />
    </>
  );
};

export default MainLayout;
