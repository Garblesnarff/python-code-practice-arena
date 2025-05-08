
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export interface XPNotification {
  visible: boolean;
  message: string;
  type: 'xp' | 'level' | 'achievement';
}

export interface LevelUpNotification {
  visible: boolean;
  message: string;
  prevLevel: number;
  newLevel: number;
}

export const useNotifications = () => {
  const [xpNotification, setXpNotification] = useState<XPNotification>({ 
    visible: false, 
    message: '', 
    type: 'xp'
  });
  
  const [levelUpNotification, setLevelUpNotification] = useState<LevelUpNotification>({
    visible: false,
    message: '',
    prevLevel: 0,
    newLevel: 0
  });

  const { profile } = useAuth();

  // Watch for level changes
  useEffect(() => {
    if (profile && profile?.level > 1) {
      // Store level in local storage to detect level changes
      const prevLevel = parseInt(localStorage.getItem('userLevel') || '1');
      
      if (profile.level > prevLevel) {
        setLevelUpNotification({
          visible: true,
          message: `Congratulations! You reached Level ${profile.level}!`,
          prevLevel,
          newLevel: profile.level
        });
        
        localStorage.setItem('userLevel', profile.level.toString());
      }
    }
  }, [profile]);

  const showXPNotification = (message: string, type: 'xp' | 'level' | 'achievement' = 'xp') => {
    setXpNotification({
      visible: true,
      message,
      type
    });
  };

  const handleNotificationClose = () => {
    setXpNotification({...xpNotification, visible: false});
  };
  
  const handleLevelUpNotificationClose = () => {
    setLevelUpNotification({...levelUpNotification, visible: false});
  };

  return {
    xpNotification,
    levelUpNotification,
    showXPNotification,
    handleNotificationClose,
    handleLevelUpNotificationClose
  };
};
