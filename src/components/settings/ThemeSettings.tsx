
import { useAppTheme } from "@/contexts/ThemeContext";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SettingsSection } from "./SettingsSection";

export function ThemeSettings() {
  const { theme, setTheme } = useAppTheme();

  return (
    <SettingsSection 
      title="Appearance" 
      description="Customize how Python Learning Arena looks on your device"
    >
      <RadioGroup 
        defaultValue={theme || 'system'} 
        onValueChange={setTheme}
        className="grid gap-4 grid-cols-1 md:grid-cols-3"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="light" id="light" />
          <Label htmlFor="light" className="cursor-pointer">Light</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="dark" id="dark" />
          <Label htmlFor="dark" className="cursor-pointer">Dark</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="system" id="system" />
          <Label htmlFor="system" className="cursor-pointer">System</Label>
        </div>
      </RadioGroup>
    </SettingsSection>
  );
}
