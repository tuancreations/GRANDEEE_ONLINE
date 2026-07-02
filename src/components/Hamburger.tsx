import React from "react";

interface HamburgerProps {
  isOpen: boolean;
  onClick: () => void;
}

const Hamburger: React.FC<HamburgerProps> = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      aria-label="Menu"
      className="hamburger-button"
      type="button"
    >
      <span className={`hamburger-line top ${isOpen ? 'open' : ''}`} />
      <span className={`hamburger-line middle ${isOpen ? 'open' : ''}`} />
      <span className={`hamburger-line bottom ${isOpen ? 'open' : ''}`} />
    </button>
  );
};

export default Hamburger;
