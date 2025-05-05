
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Award, Star, Zap } from 'lucide-react';

interface XPNotificationProps {
  message: string;
  type: 'xp' | 'level' | 'achievement';
  visible: boolean;
  onClose: () => void;
}

const XPNotification: React.FC<XPNotificationProps> = ({ 
  message, 
  type, 
  visible, 
  onClose 
}) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'xp':
        return <Star className="h-5 w-5 text-yellow-500" />;
      case 'level':
        return <Zap className="h-5 w-5 text-indigo-500" />;
      case 'achievement':
        return <Award className="h-5 w-5 text-emerald-500" />;
    }
  };
  
  const getBackgroundColor = () => {
    switch (type) {
      case 'xp':
        return 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300';
      case 'level':
        return 'bg-indigo-100 dark:bg-indigo-900/30 border-indigo-300';
      case 'achievement':
        return 'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-300';
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-4 right-4 z-50 rounded-md border px-4 py-3 shadow-md ${getBackgroundColor()}`}
        >
          <div className="flex items-center gap-2">
            {getIcon()}
            <p className="text-sm font-medium">{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default XPNotification;
