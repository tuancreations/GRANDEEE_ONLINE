import type { BuyerMarketPartition } from '../contexts/AppContext';
import { useApp } from '../contexts/AppContext';
import './MarketplaceFooter.css';

const segmentOptions: Array<{ value: BuyerMarketPartition; label: string }> = [
  { value: 'retail', label: 'Retail' },
  { value: 'manufacturer-distributor', label: 'Manufacturers' },
  { value: 'wholesale-farmer', label: 'Wholesale Farmers' },
  { value: 'professional-services', label: 'Professional Services' },
  { value: 'institution', label: 'Institutions' }
];

const MarketplaceFooter = () => {
  const { user, buyerMarketPartition, setBuyerMarketPartition } = useApp();

  return (
    <footer className={`market-footer ${user?.role === 'seller' ? 'seller-footer' : ''}`}>
      <div className="market-footer-inner">
        {user?.role === 'seller' ? (
          <p>Seller tools: manage listings, reply to requests, and monitor fulfillment from your dashboard.</p>
        ) : null}

        <div className="footer-partitions">
          {segmentOptions.map((segment) => (
            <button
              key={segment.value}
              className={`partition-button ${buyerMarketPartition === segment.value ? 'active' : ''}`}
              onClick={() => setBuyerMarketPartition(segment.value)}
            >
              {segment.label}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default MarketplaceFooter;
