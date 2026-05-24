# Grandee Online

Grandee Online is a mobile-first marketplace that makes local and global trade feel like a live market.

The platform combines:
- Product discovery
- Real-time buyer-seller negotiation (chat, voice, video)
- Flexible fulfillment (Grandee-managed or seller-managed)
- Auto-Guide pickup support for physical shop visits
- Public seller storefront links and social profiles
- Seller performance analytics and buyer update channels

## Vision

Grandee Online is designed to unify communication, transaction flow, and fulfillment in one simple experience.

Instead of forcing users to use separate tools for browsing, messaging, and logistics, Grandee lets buyers and sellers complete the full trade cycle from one interface.

## Key Experience

### Buyer Flow
1. Search and filter listings
2. Open a seller and negotiate in real-time
3. Choose delivery or Auto-Guide pickup
4. Confirm fulfillment path and complete the order

### Seller Flow
1. Create listings in minutes
2. Respond to incoming quote requests
3. Choose fulfillment model per listing
4. Manage website/social links, analytics, and buyer update channels
5. Track fulfillment stages from request to dispatch

### Seller Access
1. Switch the dashboard to seller view
2. If you are not signed in as a seller, the app hides marketplace listings and prompts you to register or log in as a seller
3. Signed-in sellers can open the full Seller Dashboard to manage listings, storefront links, performance analytics, and update channels

## Core Features

- Marketplace-first entry (no marketing landing dependency)
- Role-aware dashboards for buyers and sellers
- Real-time communication panel (chat, voice, video)
- Hybrid fulfillment model:
	- Grandee-managed logistics
	- Seller-managed delivery
- Auto-Guide pickup flow for physical location collection
- Listing-level fulfillment and pickup settings
- Mobile-friendly layout and interaction patterns
- Public seller storefront management (website + social handles)
- Seller performance analytics
- Buyer follow channels for new listing updates

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Context API for app state

## Project Structure

- `src/pages/Home.tsx`: Buyer-facing marketplace dashboard
- `src/pages/SellerDashboard.tsx`: Seller operations dashboard, storefront links, analytics, and update channels
- `src/pages/ShopDetail.tsx`: Seller profile, negotiation, follow channels, and order completion flow
- `src/components/CommunicationPanel.tsx`: Live negotiation panel
- `src/contexts/AppContext.tsx`: Shared app state and listing model

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

## Scripts

- `npm run dev`: Run development server
- `npm run build`: Build production bundle
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint checks

## Current Product Direction

Grandee Online focuses on making trading simple for both informal and formal commerce participants:

- Farmers and SMEs can onboard quickly and reach wider markets
- Professionals can operate side businesses without full-time logistics overhead
- Diaspora buyers can discover and negotiate for authentic goods from home regions
- Retail and wholesale scenarios can coexist in one marketplace
- Seller mode is gated so only seller accounts can access the real seller dashboard; buyers see marketplace listings only
- Public seller storefront links and update channels help buyers follow stores beyond the marketplace UI

## Notes

- The app currently uses mock data for shops and products.
- Communication and fulfillment flows are simulated in the UI to validate user experience and product direction.
- Seller storefront links, analytics, and buyer channel followers are stored locally in the browser for now.
