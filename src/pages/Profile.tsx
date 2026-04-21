import { useApp } from '../contexts/AppContext';
import './UtilityPages.css';

const Profile = () => {
  const { user, cartCount, wishlistCount } = useApp();

  return (
    <div className="utility-page">
      <div className="utility-container">
        <h1>My Profile</h1>
        <p className="utility-subtitle">Manage account preferences and marketplace activity overview.</p>

        <div className="utility-grid">
          <article className="utility-card">
            <h3>Account</h3>
            <p>{user?.name || user?.email || 'Guest account'}</p>
            <small>Role: {user?.role || 'buyer'}</small>
          </article>
          <article className="utility-card">
            <h3>Shopping List</h3>
            <p>{wishlistCount} saved items</p>
          </article>
          <article className="utility-card">
            <h3>Cart</h3>
            <p>{cartCount} items selected</p>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Profile;
