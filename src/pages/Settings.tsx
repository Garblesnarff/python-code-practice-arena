
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { SettingsHeader } from '@/components/settings/SettingsHeader';
import { ThemeSettings } from '@/components/settings/ThemeSettings';
import { EditorSettings } from '@/components/settings/EditorSettings';
import { NotificationSettings } from '@/components/settings/NotificationSettings';
import { useAuth } from '@/contexts/AuthContext';

const Settings = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect to auth page if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="container py-12">
          <div className="max-w-3xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          <SettingsHeader 
            title="Settings" 
            description="Manage your account settings and preferences" 
          />
          
          <div className="space-y-8">
            <ThemeSettings />
            <EditorSettings />
            <NotificationSettings />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
