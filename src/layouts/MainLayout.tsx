import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import MarketplaceFooter from '../components/MarketplaceFooter';
import WhatsAppButton from '../components/WhatsAppButton';

const MainLayout = () => {
  return (
    <>
      <Header />
      <WhatsAppButton />
      <Outlet />
      <MarketplaceFooter />
    </>
  );
};

export default MainLayout;
