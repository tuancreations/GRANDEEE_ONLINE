import './WhatsAppButton.css';

const WhatsAppButton = () => {
  // WhatsApp number in international format without plus
  const phone = '256753414058';
  const message = encodeURIComponent('Hello Grandee support');
  const href = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      className="whatsapp-float"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact Grandee on WhatsApp"
      title="Contact us on WhatsApp"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
        <path fill="#ffffff" d="M20.52 3.48A11.92 11.92 0 0 0 12.02.02C6.01.02 1.02 5.01 1.02 11.02c0 1.93.5 3.83 1.45 5.5L.02 23l6.6-2.04c1.62.88 3.45 1.35 5.4 1.35 6.01 0 11-4.99 11-11 0-3.02-1.17-5.84-3.02-7.83zM12.02 21.9c-1.77 0-3.49-.47-5.01-1.36l-.36-.21-3.92 1.21 1.25-3.73-.23-.38A9.02 9.02 0 0 1 3.02 11.02c0-4.97 4.03-9 9-9 2.4 0 4.66.94 6.36 2.64 1.7 1.7 2.64 3.96 2.64 6.36 0 4.97-4.03 9-9 9z" />
        <path fill="#ffffff" d="M17.23 14.2c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14s-.7.88-.86 1.06c-.16.18-.33.2-.61.07-.27-.14-1.14-.42-2.17-1.34-.8-.74-1.34-1.65-1.5-1.92-.16-.27-.02-.42.12-.56.12-.12.27-.33.41-.5.14-.18.18-.3.27-.5.09-.2 0-.38-.05-.52-.07-.14-.61-1.47-.84-2.02-.22-.53-.45-.46-.61-.47-.16 0-.35-.01-.53-.01s-.5.07-.76.36c-.27.29-1.03 1.01-1.03 2.47 0 1.46 1.06 2.88 1.21 3.08.14.2 2.09 3.2 5.07 4.49 2.99 1.29 2.99.86 3.54.81.55-.05 1.6-.66 1.83-1.3.23-.65.23-1.21.16-1.33-.07-.12-.27-.2-.55-.35z" />
      </svg>
    </a>
  );
};

export default WhatsAppButton;
