import { useState, useRef, useEffect } from 'react';
import './Notifications.css';

interface Notification {
  id: number;
  type: 'earnings' | 'validation' | 'social' | 'milestone' | 'challenge' | 'content';
  message: string;
  time: string;
  read: boolean;
}

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'earnings',
      message: 'Your fragment "Echoes" was approved! +45 TAO',
      time: '5m ago',
      read: false,
    },
    {
      id: 2,
      type: 'validation',
      message: '5 new validations on "Dark Matter"',
      time: '1h ago',
      read: false,
    },
    {
      id: 3,
      type: 'social',
      message: '@techwriter followed you',
      time: '2h ago',
      read: false,
    },
    {
      id: 4,
      type: 'milestone',
      message: 'Your video hit 10K views! 🎉',
      time: '3h ago',
      read: true,
    },
    {
      id: 5,
      type: 'challenge',
      message: 'Weekly challenge ends in 2 days',
      time: '5h ago',
      read: true,
    },
    {
      id: 6,
      type: 'content',
      message: 'New fragment added to "Memory Thieves" - continue the story?',
      time: '1d ago',
      read: true,
    },
  ]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'earnings':
        return '💰';
      case 'validation':
        return '✅';
      case 'social':
        return '👥';
      case 'milestone':
        return '📈';
      case 'challenge':
        return '🏆';
      case 'content':
        return '📝';
      default:
        return '🔔';
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMarkAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="notifications-container" ref={dropdownRef}>
      <button className="notifications-bell" onClick={handleToggle}>
        🔔
        {unreadCount > 0 && <span className="notifications-badge">{unreadCount}</span>}
      </button>

      {isOpen && (
        <div className="notifications-dropdown">
          <div className="notifications-header">
            <h3>Notifications</h3>
            <div className="notifications-actions">
              {unreadCount > 0 && (
                <button className="action-btn" onClick={handleMarkAllAsRead}>
                  Mark all read
                </button>
              )}
              {notifications.length > 0 && (
                <button className="action-btn" onClick={handleClearAll}>
                  Clear all
                </button>
              )}
            </div>
          </div>

          <div className="notifications-list">
            {notifications.length === 0 ? (
              <div className="notifications-empty">
                <div className="empty-icon">🔕</div>
                <p>No notifications</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  <div className="notification-icon">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="notification-content">
                    <p className="notification-message">{notification.message}</p>
                    <span className="notification-time">{notification.time}</span>
                  </div>
                  {!notification.read && <div className="notification-dot" />}
                </div>
              ))
            )}
          </div>

          {notifications.length > 0 && (
            <div className="notifications-footer">
              <button className="view-all-btn">View All Notifications</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
