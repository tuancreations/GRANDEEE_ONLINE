import { Link } from 'react-router-dom';
import './UtilityPages.css';

const Help = () => {
  return (
    <div className="utility-page">
      <div className="utility-container">
        <h1>How the Marketplace Works</h1>
        <p className="utility-subtitle">A full guide to features and how to use Grandee Online as a buyer or seller.</p>

        <section style={{ marginTop: 18 }}>
          <h2>Overview</h2>
          <p className="utility-note">Grandee Online is a unified marketplace where buyers and sellers transact, chat and manage fulfillment from dedicated dashboards. The app supports multiple market partitions (retail, wholesale, manufacturer/distributor, professional services, institutions). Use the navigation to switch between the Dashboard, All Shops, Help, and Sign In.</p>
        </section>

        <section style={{ marginTop: 18 }}>
          <h2>Core Features</h2>
          <ul>
            <li>Marketplace-first entry (no marketing landing dependency)</li>
            <li>Role-aware dashboards for buyers and sellers</li>
            <li>Real-time communication panel (chat, voice, video)</li>
            <li>Hybrid fulfillment model:
              <ul>
                <li>Grandee-managed logistics</li>
                <li>Seller-managed delivery</li>
              </ul>
            </li>
            <li>Auto-Guide pickup flow for physical location collection</li>
            <li>Listing-level fulfillment and pickup settings</li>
            <li>Mobile-friendly layout and interaction patterns</li>
          </ul>
        </section>

        <section style={{ marginTop: 18 }}>
          <h2>Buyer: Getting Started</h2>
          <ol>
            <li><strong>Create an account</strong> — Sign up or sign in. A buyer account lets you search, save items, and request quotes.</li>
            <li><strong>Search & discover</strong> — Use the top search bar or category chips to find items. Toggle market partition to see retail or wholesale listings.</li>
            <li><strong>View product details</strong> — Click a product to view descriptions, price, seller info, ratings and fulfillment modes.</li>
            <li><strong>Request or buy</strong> — If an item has an instant quote, accept it to place an order. For request-order listings, click "Request Quote" to send a request to the seller.</li>
            <li><strong>Negotiate in chat</strong> — Open the Communication Panel to chat with sellers. You can exchange messages, share images, and agree payment or delivery terms.</li>
            <li><strong>Shopping list & cart</strong> — Save items to your Shopping List to compare later. Move selected items to Cart to prepare for checkout.</li>
            <li><strong>Checkout & fulfillment</strong> — Choose platform logistics, seller delivery, or pickup when finalising the order. Track fulfillment from the Orders page.</li>
            <li><strong>Orders & tracking</strong> — The Orders page shows order status, seller responses, tracking numbers and invoices.</li>
          </ol>
        </section>

        <section style={{ marginTop: 18 }}>
          <h2>Seller: Getting Started</h2>
          <ol>
            <li><strong>Create a seller account</strong> — Register and complete your seller profile with business details and preferred fulfillment modes.</li>
            <li><strong>Seller Dashboard</strong> — Use the Seller Dashboard to publish listings, set inventory, prices, and choose whether items support instant quotes or request-order flows.</li>
            <li><strong>Respond to requests</strong> — When buyers send requests or open chats, reply promptly. Use the built-in templates for faster responses.</li>
            <li><strong>Manage orders</strong> — Confirm availability, prepare dispatch, and update order status. Choose to use platform logistics, your courier, or arrange pickup.</li>
            <li><strong>Fulfillment and tracking</strong> — When you ship an order, add tracking and mark items as dispatched so buyers can follow progress.</li>
            <li><strong>Payments & invoices</strong> — Sellers can generate invoices for request-orders and manage payments (the app currently simulates payments unless a payment integration is connected).</li>
          </ol>
        </section>

        <section style={{ marginTop: 18 }}>
          <h2>Seller Access Rules</h2>
          <p className="utility-note">Seller mode is protected. If you switch the dashboard to seller view while signed out, the app will hide market listings and prompt you to register or log in as a seller first. After signing in, you can open the real Seller Dashboard to manage storefront links, analytics, and buyer update channels.</p>
        </section>

        <section style={{ marginTop: 18 }}>
          <h2>Seller Storefront & Buyer Channels</h2>
          <ul>
            <li><strong>Website links:</strong> Add your public shop website so buyers can open it directly from seller cards and seller profiles.</li>
            <li><strong>Social handles:</strong> Add Instagram, Facebook, X, TikTok, and YouTube handles so buyers can follow your brand across channels.</li>
            <li><strong>Performance analytics:</strong> Track profile views, website clicks, social clicks, inquiries, followers, and channel subscribers from the Seller Dashboard.</li>
            <li><strong>Update channels:</strong> Create channels for new products, restocks, offers, or announcements so buyers can follow and stay informed.</li>
          </ul>
        </section>

        <section style={{ marginTop: 18 }}>
          <h2>Key Features Explained</h2>
          <div className="utility-grid">
            <article className="utility-card">
              <h3>Search & Filters</h3>
              <p>Search by name, category or seller. Use partition filters (retail, wholesale, etc.) to match your procurement needs.</p>
            </article>

            <article className="utility-card">
              <h3>Communication Panel</h3>
              <p>The Communication Panel aggregates chats and active negotiations. Start private chats from any product or seller page; attachments and quick replies are supported.</p>
            </article>

            <article className="utility-card">
              <h3>Listings & Flow Types</h3>
              <p>Listings support two flows: instant-quote (buyer can accept immediately) and request-order (buyer sends a request; seller confirms).</p>
            </article>

            <article className="utility-card">
              <h3>Seller Verification</h3>
              <p>Top verified sellers display a badge. Verification is based on seller-provided documentation and platform screening.</p>
            </article>

            <article className="utility-card">
              <h3>Shopping List & Wishlist</h3>
              <p>Save items to compare later or keep a wishlist for future procurement. Items in the shopping list can be moved to cart quickly.</p>
            </article>

            <article className="utility-card">
              <h3>Orders & Tracking</h3>
              <p>Track order status and delivery progress. Sellers can add tracking numbers and update fulfillment stages.</p>
            </article>

            <article className="utility-card">
              <h3>Seller Access & Routing</h3>
              <p>Seller mode hides market listings until the user registers or signs in as a seller, then routes them to the full seller dashboard.</p>
            </article>

            <article className="utility-card">
              <h3>Storefront Links</h3>
              <p>Public shop cards and seller profiles now show the seller website and social links buyers can open directly.</p>
            </article>

            <article className="utility-card">
              <h3>Buyer Channels</h3>
              <p>Buyers can follow update channels to receive notifications about new listings, promotions, and restocks.</p>
            </article>
          </div>
        </section>

        <section style={{ marginTop: 18 }}>
          <h2>Tips & Recommended Workflows</h2>
          <ul>
            <li><strong>Buyers:</strong> Start with category chips for faster browsing, shortlist 3–5 sellers and use the chat to compare quotes before ordering.</li>
            <li><strong>Sellers:</strong> Keep inventory and lead times accurate; enable instant-quote for frequently-ordered SKUs to increase conversions.</li>
            <li><strong>Both:</strong> Use clear messages in chat and attach photos or spec sheets to avoid misunderstandings.</li>
          </ul>
        </section>

        <section style={{ marginTop: 18 }}>
          <h2>Privacy & Account Settings</h2>
          <p className="utility-note">Manage your profile, notification preferences, and connected accounts from the Profile page. We store minimal personal data locally for this demo app; connect a real backend for persistent storage and payment integrations.</p>
        </section>

        <section style={{ marginTop: 18 }}>
          <h2>Need More Help?</h2>
          <p>If you're stuck, use the "Need help" link on the dashboard, open a chat with support (if enabled), or email support@example.com. Return to the <Link to="/">dashboard</Link> to continue browsing.</p>
        </section>
      </div>
    </div>
  );
};

export default Help;
