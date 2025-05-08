
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { SettingsSection } from "./SettingsSection";
import { Button } from "../ui/button";

export function NotificationSettings() {
  const [xpNotifications, setXpNotifications] = useState(true);
  const [levelUpNotifications, setLevelUpNotifications] = useState(true);
  const [achievementNotifications, setAchievementNotifications] = useState(true);

  // In a real implementation, we would save these settings to localStorage or Supabase
  const saveSettings = () => {
    const settings = {
      xpNotifications,
      levelUpNotifications,
      achievementNotifications
    };
    localStorage.setItem("notification-settings", JSON.stringify(settings));
  };

  return (
    <SettingsSection 
      title="Notifications" 
      description="Control your notification preferences"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="xp-notifications">XP Notifications</Label>
            <p className="text-sm text-muted-foreground">Show notifications when you earn XP</p>
          </div>
          <Switch 
            id="xp-notifications"
            checked={xpNotifications}
            onCheckedChange={setXpNotifications}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="level-up-notifications">Level Up Notifications</Label>
            <p className="text-sm text-muted-foreground">Show notifications when you level up</p>
          </div>
          <Switch 
            id="level-up-notifications"
            checked={levelUpNotifications}
            onCheckedChange={setLevelUpNotifications}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="achievement-notifications">Achievement Notifications</Label>
            <p className="text-sm text-muted-foreground">Show notifications when you earn achievements</p>
          </div>
          <Switch 
            id="achievement-notifications"
            checked={achievementNotifications}
            onCheckedChange={setAchievementNotifications}
          />
        </div>

        <Button onClick={saveSettings} className="mt-4">Save Notification Settings</Button>
      </div>
    </SettingsSection>
  );
}
