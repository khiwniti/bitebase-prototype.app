import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function ApiSettings() {
  return (
    <Card className="bg-zinc-900/90 backdrop-blur-sm border-zinc-800 text-white">
      <CardHeader>
        <CardTitle>API Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="api-key">API Key</Label>
          <Input id="api-key" defaultValue="sk_test_123456789" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="webhook">Webhook URL</Label>
          <Input id="webhook" defaultValue="https://example.com/webhook" />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="notifications">Enable API Notifications</Label>
          <Switch id="notifications" defaultChecked />
        </div>
        <Button>Save API Settings</Button>
      </CardContent>
    </Card>
  );
}
