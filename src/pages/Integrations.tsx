import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Instagram, 
  Youtube, 
  Twitter, 
  Linkedin,
  CheckCircle,
  AlertCircle,
  Settings,
  Plus,
  Trash2
} from "lucide-react";

const integrations = [
  {
    id: "instagram",
    name: "Instagram Business",
    icon: Instagram,
    connected: true,
    status: "active",
    description: "Post photos, reels, and stories",
    lastSync: "2 minutes ago",
    postsCount: 24
  },
  {
    id: "youtube", 
    name: "YouTube",
    icon: Youtube,
    connected: true,
    status: "active", 
    description: "Upload and manage video content",
    lastSync: "1 hour ago",
    postsCount: 6
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: Linkedin,
    connected: true,
    status: "warning",
    description: "Share professional content and articles", 
    lastSync: "API limit reached",
    postsCount: 12
  },
  {
    id: "twitter",
    name: "Twitter",
    icon: Twitter,
    connected: false,
    status: "inactive",
    description: "Tweet and engage with your audience",
    lastSync: "Not connected",
    postsCount: 0
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: Settings,
    connected: false, 
    status: "inactive",
    description: "Create and share short videos",
    lastSync: "Not connected",
    postsCount: 0
  }
];

const workflows = [
  {
    id: "content-gen",
    name: "Content Generation", 
    status: "running",
    description: "AI content creation workflow",
    lastRun: "5 minutes ago",
    successRate: "98%"
  },
  {
    id: "analytics",
    name: "Analytics Processing",
    status: "running", 
    description: "Performance data collection",
    lastRun: "1 hour ago",
    successRate: "95%"
  },
  {
    id: "auto-post",
    name: "Auto Publishing",
    status: "paused",
    description: "Scheduled content publishing", 
    lastRun: "Yesterday",
    successRate: "92%"
  }
];

export default function Integrations() {
  const [integrationStates, setIntegrationStates] = useState(
    integrations.reduce((acc, integration) => {
      acc[integration.id] = integration.connected;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const toggleIntegration = (id: string) => {
    setIntegrationStates(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-success";
      case "warning": return "text-warning";
      case "inactive": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle className="h-4 w-4 text-success" />;
      case "warning": return <AlertCircle className="h-4 w-4 text-warning" />;
      case "inactive": return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
      default: return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Integrations</h1>
        <p className="text-muted-foreground">
          Connect your social media accounts and manage n8n automation workflows
        </p>
      </div>

      {/* Social Media Connections */}
      <Card>
        <CardHeader>
          <CardTitle>Social Media Platforms</CardTitle>
          <CardDescription>
            Connect your social media accounts to enable automated posting and analytics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {integrations.map((integration) => (
              <div key={integration.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      integration.connected ? 'bg-gradient-primary' : 'bg-muted'
                    }`}>
                      <integration.icon className={`w-5 h-5 ${
                        integration.connected ? 'text-primary-foreground' : 'text-muted-foreground'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-medium">{integration.name}</h3>
                      <p className="text-sm text-muted-foreground">{integration.description}</p>
                    </div>
                  </div>
                  <Switch
                    checked={integrationStates[integration.id]}
                    onCheckedChange={() => toggleIntegration(integration.id)}
                  />
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(integration.status)}
                    <span className={getStatusColor(integration.status)}>
                      {integration.lastSync}
                    </span>
                  </div>
                  {integration.connected && (
                    <Badge variant="secondary">
                      {integration.postsCount} posts
                    </Badge>
                  )}
                </div>

                {integration.connected && (
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm">
                      <Settings className="mr-2 h-3 w-3" />
                      Configure
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive">
                      <Trash2 className="mr-2 h-3 w-3" />
                      Disconnect
                    </Button>
                  </div>
                )}

                {!integration.connected && (
                  <Button className="w-full mt-3" variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Connect {integration.name}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* n8n Workflows */}
      <Card>
        <CardHeader>
          <CardTitle>Automation Workflows</CardTitle>
          <CardDescription>
            Monitor and manage your n8n workflows for content automation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workflows.map((workflow) => (
              <div key={workflow.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${
                    workflow.status === 'running' ? 'bg-success animate-pulse' : 
                    workflow.status === 'paused' ? 'bg-warning' : 'bg-muted-foreground'
                  }`}></div>
                  <div>
                    <h4 className="font-medium">{workflow.name}</h4>
                    <p className="text-sm text-muted-foreground">{workflow.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right text-sm">
                    <div className="text-muted-foreground">Last run: {workflow.lastRun}</div>
                    <div className="text-success">Success rate: {workflow.successRate}</div>
                  </div>
                  <Badge variant={workflow.status === 'running' ? 'default' : 'secondary'}>
                    {workflow.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Settings className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* API Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
          <CardDescription>
            Manage API keys and webhook endpoints for external integrations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">n8n Webhook URL</h4>
                <p className="text-sm text-muted-foreground">Endpoint for content generation triggers</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Active</Badge>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Analytics API</h4>
                <p className="text-sm text-muted-foreground">Data collection and reporting endpoints</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Active</Badge>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Content Approval Webhook</h4>
                <p className="text-sm text-muted-foreground">Automated content approval notifications</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Inactive</Badge>
                <Button variant="outline" size="sm">Setup</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}