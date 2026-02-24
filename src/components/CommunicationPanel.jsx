import { useState, useEffect, useRef } from 'react';
import { useApp } from '../contexts/AppContext';
import './CommunicationPanel.css';

const CommunicationPanel = ({ shop }) => {
  const { activeCommunication, startCommunication, endCommunication, updateSellerLocation } = useApp();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  const [callDuration, setCallDuration] = useState(0);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (activeCommunication && (activeCommunication.type === 'voice' || activeCommunication.type === 'video')) {
      const interval = setInterval(() => {
        setCallDuration(Math.floor((Date.now() - activeCommunication.startTime) / 1000));
        updateSellerLocation();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [activeCommunication, updateSellerLocation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleStartChat = () => {
    startCommunication(shop, 'chat');
    setActiveTab('chat');
    setTimeout(() => {
      setMessages([
        { id: 1, sender: 'seller', text: `Hello! Welcome to ${shop.name}. How can I help you today?`, time: new Date() }
      ]);
    }, 1000);
  };

  const handleStartVoice = () => {
    startCommunication(shop, 'voice');
    setActiveTab('voice');
  };

  const handleStartVideo = () => {
    startCommunication(shop, 'video');
    setActiveTab('video');
  };

  const handleEndCommunication = () => {
    endCommunication();
    setMessages([]);
    setCallDuration(0);
    setActiveTab('chat');
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'customer',
      text: inputMessage,
      time: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');

    setTimeout(() => {
      const replies = [
        "Sure, I can help you with that!",
        "Let me check that for you.",
        "That's a great choice!",
        "I'll get back to you shortly.",
        "Would you like more information about this product?"
      ];
      const reply = {
        id: messages.length + 2,
        sender: 'seller',
        text: replies[Math.floor(Math.random() * replies.length)],
        time: new Date()
      };
      setMessages(prev => [...prev, reply]);
    }, 1500);
  };

  const handleFileUpload = () => {
    const fileMessage = {
      id: messages.length + 1,
      sender: 'customer',
      text: '📎 Document shared',
      type: 'file',
      time: new Date()
    };
    setMessages([...messages, fileMessage]);
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!shop.online) {
    return (
      <div className="communication-panel">
        <div className="offline-notice">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <h3>Shop Offline</h3>
          <p>This shop is currently offline. Please check back later.</p>
        </div>
      </div>
    );
  }

  if (!activeCommunication) {
    return (
      <div className="communication-panel">
        <div className="panel-header">
          <h3>Contact Shop</h3>
          <p>Start a conversation with {shop.name}</p>
        </div>

        <div className="communication-options">
          <button onClick={handleStartChat} className="comm-option-btn chat">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span>Start Chat</span>
          </button>

          <button onClick={handleStartVoice} className="comm-option-btn voice">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>Voice Call</span>
          </button>

          <button onClick={handleStartVideo} className="comm-option-btn video">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
            <span>Video Call</span>
          </button>
        </div>

        <div className="features-list">
          <div className="feature-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#28a745" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Real-time messaging</span>
          </div>
          <div className="feature-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#28a745" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Media & document sharing</span>
          </div>
          <div className="feature-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#28a745" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Live seller location tracking</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="communication-panel active">
      <div className="panel-header active-header">
        <div className="active-shop-info">
          <img src={shop.avatar} alt={shop.name} className="active-shop-avatar" />
          <div>
            <h3>{shop.name}</h3>
            <span className="connection-status">● Connected</span>
          </div>
        </div>
        <button onClick={handleEndCommunication} className="end-btn">
          End
        </button>
      </div>

      {activeCommunication.type === 'chat' && (
        <div className="chat-container">
          <div className="messages-area">
            {messages.map(msg => (
              <div key={msg.id} className={`message ${msg.sender}`}>
                <div className="message-content">
                  {msg.text}
                </div>
                <div className="message-time">
                  {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-actions">
            <button onClick={handleFileUpload} className="icon-btn" title="Attach file">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
              </svg>
            </button>

            <form onSubmit={handleSendMessage} className="message-form">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="message-input"
              />
              <button type="submit" className="send-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}

      {(activeCommunication.type === 'voice' || activeCommunication.type === 'video') && (
        <div className="call-container">
          <div className="call-display">
            {activeCommunication.type === 'video' ? (
              <div className="video-call">
                <div className="video-placeholder">
                  <img src={shop.avatar} alt={shop.name} className="video-avatar" />
                  <p>{shop.name}</p>
                </div>
                <div className="video-local">
                  <div className="video-local-placeholder">You</div>
                </div>
              </div>
            ) : (
              <div className="voice-call">
                <img src={shop.avatar} alt={shop.name} className="call-avatar" />
                <h3>{shop.name}</h3>
                <p className="call-status">Voice Call Active</p>
              </div>
            )}
          </div>

          <div className="call-info">
            <div className="call-duration">{formatDuration(callDuration)}</div>
            <div className="tracking-indicator">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#28a745" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Live location tracking active
            </div>
          </div>

          <div className="call-controls">
            <button className="control-btn mute">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            </button>

            {activeCommunication.type === 'video' && (
              <button className="control-btn camera">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              </button>
            )}

            <button onClick={handleEndCommunication} className="control-btn end-call">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunicationPanel;
