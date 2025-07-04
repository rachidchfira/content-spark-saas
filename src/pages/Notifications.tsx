import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Bell,
  Mail,
  MessageSquare,
  TrendingUp,
  Calendar,
  Settings,
  CheckCircle,
  Clock
} from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "Content Generated Successfully",
    message: "Your Instagram post about 'Morning Motivation' has been generated and is ready for review.",
    type: "success",
    time: "5 minutes ago",
    read: false
  },
  {
    id: 2,
    title: "High Engagement Alert",
    message: "Your TikTok video is performing 25% above average engagement rate.",
    type: "info", 
    time: "1 hour ago",
    read: false
  },
  {
    id: 3,
    title: "Content Scheduled",
    message: "3 posts have been scheduled for tomorrow across Instagram, LinkedIn, and Twitter.",
    type: "success",
    time: "2 hours ago", 
    read: true
  },
  {
    id: 4,
    title: "API Limit Warning",
    message: "LinkedIn API is approaching rate limit. Consider upgrading your plan.",
    type: "warning",
    time: "3 hours ago",
    read: false
  },
  {
    id: 5,
    title: "Weekly Report Ready",
    message: "Your weekly performance report is available for download.",
    type: "info",
    time: "1 day ago",
    read: true
  }
];

const notificationSettings = [
  { key: "content_generation", label: "Content Generation", description: "When AI finishes generating content", enabled: true },
  { key: "high_engagement", label: "High Engagement", description: "When posts perform above average", enabled: true },
  { key: "scheduling", label: "Content Scheduling", description: "When content is scheduled or published", enabled: false },
  { key: "api_limits", label: "API Limits", description: "When approaching rate limits", enabled: true },
  { key: "weekly_reports", label: "Weekly Reports", description: "Weekly performance summaries", enabled: true },
  { key: "workflow_errors", label: "Workflow Errors", description: "When n8n workflows fail", enabled: true },
];

export default function Notifications() {
  const [settings, setSettings] = useState(
    notificationSettings.reduce((acc, setting) => {
      acc[setting.key] = setting.enabled;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const toggleSetting = (key: string) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success": return <CheckCircle className="h-4 w-4 text-success" />;
      case "warning": return <Bell className="h-4 w-4 text-warning" />;
      case "info": return <TrendingUp className="h-4 w-4 text-primary" />;
      default: return <Bell className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "success": return "success" as const;
      case "warning": return "destructive" as const;
      case "info": return "default" as const;
      default: return "secondary" as const;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with your AI content workflows and performance alerts
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline">
            {unreadCount} unread
          </Badge>
          <Button variant="outline">
            Mark All Read
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Notifications List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Recent Notifications
            </CardTitle>
            <CardDescription>
              Latest updates from your AI content automation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border rounded-lg hover:bg-muted/50 transition-colors ${
                    !notification.read ? 'bg-primary/5 border-primary/20' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{notification.title}</h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant={getBadgeVariant(notification.type)} className="text-xs">
                          {notification.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {notification.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Load More Notifications
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Notification Settings
            </CardTitle>
            <CardDescription>
              Configure when you want to be notified
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {notificationSettings.map((setting) => (
              <div key={setting.key} className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">{setting.label}</h4>
                  <p className="text-xs text-muted-foreground">
                    {setting.description}
                  </p>
                </div>
                <Switch
                  checked={settings[setting.key]}
                  onCheckedChange={() => toggleSetting(setting.key)}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Notification Channels */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Channels</CardTitle>
          <CardDescription>
            Choose how you want to receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Bell className="h-5 w-5 text-primary" />
                <div>
                  <h4 className="font-medium">In-App</h4>
                  <p className="text-sm text-muted-foreground">Browser notifications</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-sm text-muted-foreground">john@company.com</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <MessageSquare className="h-5 w-5 text-primary" />
                <div>
                  <h4 className="font-medium">Slack</h4>
                  <p className="text-sm text-muted-foreground">Team workspace</p>
                </div>
              </div>
              <Switch />
              <Button variant="outline" size="sm" className="w-full mt-2">
                Connect Slack
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}