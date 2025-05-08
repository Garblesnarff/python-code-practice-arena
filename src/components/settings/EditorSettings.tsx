
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SettingsSection } from "./SettingsSection";
import { Button } from "../ui/button";

export function EditorSettings() {
  const [fontSize, setFontSize] = useState(14);
  const [tabSize, setTabSize] = useState(4);
  const [wordWrap, setWordWrap] = useState(true);
  const [theme, setTheme] = useState("vs-dark");

  // In a real implementation, we would save these settings to localStorage or Supabase
  const saveSettings = () => {
    const settings = {
      fontSize,
      tabSize,
      wordWrap,
      theme
    };
    localStorage.setItem("editor-settings", JSON.stringify(settings));
  };

  return (
    <SettingsSection 
      title="Code Editor" 
      description="Customize your code editor experience"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="font-size">Font Size: {fontSize}px</Label>
          </div>
          <Slider 
            id="font-size"
            min={10}
            max={24}
            step={1}
            defaultValue={[fontSize]}
            onValueChange={(value) => setFontSize(value[0])}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tab-size">Tab Size</Label>
          <Select 
            value={tabSize.toString()} 
            onValueChange={(value) => setTabSize(parseInt(value))}
          >
            <SelectTrigger id="tab-size">
              <SelectValue placeholder="Select tab size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2 spaces</SelectItem>
              <SelectItem value="4">4 spaces</SelectItem>
              <SelectItem value="8">8 spaces</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="word-wrap">Word Wrap</Label>
          <Switch 
            id="word-wrap"
            checked={wordWrap}
            onCheckedChange={setWordWrap}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="editor-theme">Editor Theme</Label>
          <Select 
            value={theme} 
            onValueChange={setTheme}
          >
            <SelectTrigger id="editor-theme">
              <SelectValue placeholder="Select editor theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vs">Light</SelectItem>
              <SelectItem value="vs-dark">Dark</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={saveSettings}>Save Editor Settings</Button>
      </div>
    </SettingsSection>
  );
}
