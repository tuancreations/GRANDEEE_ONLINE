import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import MarketplaceFooter from '../components/MarketplaceFooter';
import WhatsAppButton from '../components/WhatsAppButton';

const MainLayout = () => {
  return (
    <>
      <Header />
      <WhatsAppButton />
      <main className="layout-main">
        <Outlet />
      </main>
      <MarketplaceFooter />
    </>
  );
};

export default MainLayout;
