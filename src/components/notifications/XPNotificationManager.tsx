
import React from 'react';
import XPNotification from '@/components/XPNotification';

interface XPNotificationManagerProps {
  notification: {
    visible: boolean;
    message: string;
    type: 'xp' | 'level' | 'achievement';
  };
  levelUpNotification?: {
    visible: boolean;
    message: string;
  };
  onNotificationClose: () => void;
  onLevelUpNotificationClose?: () => void;
}

const XPNotificationManager: React.FC<XPNotificationManagerProps> = ({
  notification,
  levelUpNotification,
  onNotificationClose,
  onLevelUpNotificationClose
}) => {
  return (
    <>
      <XPNotification
        message={notification.message}
        type={notification.type}
        visible={notification.visible}
        onClose={onNotificationClose}
      />
      
      {levelUpNotification && (
        <XPNotification
          message={levelUpNotification.message}
          type="level"
          visible={levelUpNotification.visible}
          onClose={onLevelUpNotificationClose || (() => {})}
        />
      )}
    </>
  );
};

export default XPNotificationManager;
