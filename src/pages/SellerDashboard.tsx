import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import './SellerDashboard.css';

type ListingFormState = {
  title: string;
  category: string;
  price: string;
  currency: string;
  stock: string;
  description: string;
  imageUrl: string;
  location: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
};

const initialFormState: ListingFormState = {
  title: '',
  category: 'Food & Beverages',
  price: '',
  currency: 'USD',
  stock: '',
  description: '',
  imageUrl: '',
  location: '',
  contactName: '',
  contactPhone: '',
  contactEmail: ''
};

const fallbackImageUrl =
  'https://images.pexels.com/photos/6214378/pexels-photo-6214378.jpeg?auto=compress&cs=tinysrgb&w=300';

const SellerDashboard = () => {
  const { user, sellerListings, addSellerListing, updateSellerListing, toggleListingStatus } = useApp();
  const [formData, setFormData] = useState<ListingFormState>(initialFormState);
  const [editingId, setEditingId] = useState<number | null>(null);

  if (!user || user.role !== 'seller') {
    return <Navigate to="/signin" replace />;
  }

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      contactEmail: prev.contactEmail || user.email
    }));
  }, [user.email]);

  const activeCount = useMemo(
    () => sellerListings.filter((item) => item.isActive).length,
    [sellerListings]
  );

  const totalStock = useMemo(
    () => sellerListings.reduce((sum, item) => sum + item.stock, 0),
    [sellerListings]
  );

  const validateAndBuildPayload = () => {
    const price = Number(formData.price);
    const stock = Number(formData.stock);

    if (!formData.title.trim() || !formData.description.trim()) {
      alert('Please provide a title and description.');
      return null;
    }

    if (Number.isNaN(price) || price <= 0) {
      alert('Please enter a valid price greater than 0.');
      return null;
    }

    if (Number.isNaN(stock) || stock < 0) {
      alert('Please enter a valid stock amount.');
      return null;
    }

    if (!formData.location.trim() || !formData.contactName.trim() || !formData.contactPhone.trim()) {
      alert('Please add location and seller contact details.');
      return null;
    }

    if (!formData.contactEmail.trim()) {
      alert('Please provide a contact email address.');
      return null;
    }

    return {
      title: formData.title.trim(),
      category: formData.category,
      price,
      currency: formData.currency,
      stock,
      description: formData.description.trim(),
      imageUrl: formData.imageUrl.trim() || fallbackImageUrl,
      location: formData.location.trim(),
      contactName: formData.contactName.trim(),
      contactPhone: formData.contactPhone.trim(),
      contactEmail: formData.contactEmail.trim()
    };
  };

  const resetForm = () => {
    setFormData({ ...initialFormState, contactEmail: user.email });
    setEditingId(null);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = validateAndBuildPayload();

    if (!payload) {
      return;
    }

    if (editingId) {
      updateSellerListing(editingId, payload);
    } else {
      addSellerListing(payload);
    }

    resetForm();
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const imageDataUrl = typeof reader.result === 'string' ? reader.result : '';
      setFormData((prev) => ({ ...prev, imageUrl: imageDataUrl }));
    };
    reader.readAsDataURL(file);
  };

  const startEditListing = (id: number) => {
    const listing = sellerListings.find((item) => item.id === id);

    if (!listing) {
      return;
    }

    setEditingId(id);
    setFormData({
      title: listing.title,
      category: listing.category,
      price: String(listing.price),
      currency: listing.currency,
      stock: String(listing.stock),
      description: listing.description,
      imageUrl: listing.imageUrl,
      location: listing.location,
      contactName: listing.contactName,
      contactPhone: listing.contactPhone,
      contactEmail: listing.contactEmail
    });
  };

  return (
    <div className="seller-dashboard-page">
      <div className="seller-dashboard-container">
        <section className="seller-hero">
          <div>
            <p className="seller-kicker">Seller Onboarding</p>
            <h1>Welcome, {user?.name || user?.email}</h1>
            <p>
              Complete your seller setup by publishing listings with clear pricing,
              available stock, and delivery details buyers can trust.
            </p>
          </div>
        </section>

        <section className="seller-metrics">
          <article className="metric-card">
            <h3>Total Listings</h3>
            <p>{sellerListings.length}</p>
          </article>
          <article className="metric-card">
            <h3>Live Listings</h3>
            <p>{activeCount}</p>
          </article>
          <article className="metric-card">
            <h3>Ready-to-Sell Units</h3>
            <p>{totalStock}</p>
          </article>
        </section>

        <section className="seller-grid">
          <article className="seller-card">
            <h2>{editingId ? 'Edit Published Listing' : 'Publish a New Listing'}</h2>
            <form className="seller-form" onSubmit={handleSubmit}>
              <label>Product Name</label>
              <input
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="e.g. Fresh Mango Crate"
                required
              />

              <div className="seller-form-row">
                <div>
                  <label>Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                  >
                    <option>Food & Beverages</option>
                    <option>Fashion</option>
                    <option>Electronics</option>
                    <option>Beauty</option>
                    <option>Home & Living</option>
                    <option>Sports</option>
                  </select>
                </div>

                <div>
                  <label>Currency</label>
                  <select
                    value={formData.currency}
                    onChange={(e) => setFormData((prev) => ({ ...prev, currency: e.target.value }))}
                  >
                    <option>USD</option>
                    <option>UGX</option>
                    <option>GBP</option>
                    <option>EUR</option>
                  </select>
                </div>
              </div>

              <div className="seller-form-row">
                <div>
                  <label>Price</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                    placeholder="0.00"
                    required
                  />
                </div>
                <div>
                  <label>Stock</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData((prev) => ({ ...prev, stock: e.target.value }))}
                    placeholder="0"
                    required
                  />
                </div>
              </div>

              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Brief product description"
                required
              />

              <label>Upload Product Picture</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} />

              <label>Or paste image URL (optional)</label>
              <input
                value={formData.imageUrl}
                onChange={(e) => setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))}
                placeholder="https://..."
              />

              {(formData.imageUrl || '').trim() && (
                <img className="seller-image-preview" src={formData.imageUrl} alt="Listing preview" />
              )}

              <label>Seller Location</label>
              <input
                value={formData.location}
                onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                placeholder="e.g. Kikuubo, Kampala"
                required
              />

              <div className="seller-form-row">
                <div>
                  <label>Contact Name</label>
                  <input
                    value={formData.contactName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, contactName: e.target.value }))}
                    placeholder="e.g. Sales Manager"
                    required
                  />
                </div>

                <div>
                  <label>Contact Phone</label>
                  <input
                    value={formData.contactPhone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, contactPhone: e.target.value }))}
                    placeholder="+256..."
                    required
                  />
                </div>
              </div>

              <label>Contact Email</label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData((prev) => ({ ...prev, contactEmail: e.target.value }))}
                placeholder="seller@example.com"
                required
              />

              <button type="submit" className="seller-submit-btn">
                {editingId ? 'Save Changes to Listing' : 'Publish Listing and Start Receiving Inquiries'}
              </button>

              {editingId && (
                <button type="button" className="seller-cancel-btn" onClick={resetForm}>
                  Cancel Editing
                </button>
              )}
            </form>
          </article>

          <article className="seller-card">
            <h2>Your Live Catalog</h2>
            <div className="listing-list">
              {sellerListings.map((item) => (
                <div key={item.id} className="listing-item">
                  <img src={item.imageUrl} alt={item.title} className="listing-image" />
                  <div className="listing-body">
                    <h3>{item.title}</h3>
                    <p>{item.category}</p>
                    <div className="listing-meta">
                      <span>
                        {item.currency} {item.price.toLocaleString()}
                      </span>
                      <span>Stock: {item.stock}</span>
                    </div>
                    <p className="listing-contact-line">Location: {item.location}</p>
                    <p className="listing-contact-line">
                      Contact: {item.contactName} | {item.contactPhone} | {item.contactEmail}
                    </p>
                  </div>
                  <div className="listing-actions">
                    <button className="listing-edit" onClick={() => startEditListing(item.id)}>
                      Edit
                    </button>
                    <button
                      className={`listing-toggle ${item.isActive ? 'active' : 'paused'}`}
                      onClick={() => toggleListingStatus(item.id)}
                    >
                      {item.isActive ? 'Live' : 'Paused'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>
      </div>
    </div>
  );
};

export default SellerDashboard;
