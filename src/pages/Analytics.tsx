import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Heart, 
  MessageCircle, 
  Share,
  Download,
  Calendar
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const metrics = [
  { title: "Total Reach", value: "45.2K", change: "+12.5%", trend: "up", icon: Users },
  { title: "Engagement Rate", value: "8.4%", change: "+2.1%", trend: "up", icon: Heart },
  { title: "Comments", value: "1,234", change: "-5.2%", trend: "down", icon: MessageCircle },
  { title: "Shares", value: "892", change: "+15.7%", trend: "up", icon: Share },
];

const topPosts = [
  {
    id: 1,
    title: "Morning Motivation: 5 Habits That Changed My Life",
    platform: "Instagram",
    reach: "12.5K",
    engagement: "15.2%",
    date: "2024-01-10"
  },
  {
    id: 2,
    title: "Behind the Scenes: Product Development",
    platform: "TikTok",
    reach: "8.9K", 
    engagement: "12.8%",
    date: "2024-01-08"
  },
  {
    id: 3,
    title: "Industry Trends: What's Coming in 2024",
    platform: "LinkedIn",
    reach: "6.2K",
    engagement: "11.4%",
    date: "2024-01-05"
  }
];

const platformData = [
  { platform: "Instagram", posts: 24, reach: "15.2K", engagement: "9.1%" },
  { platform: "TikTok", posts: 18, reach: "12.8K", engagement: "8.7%" },
  { platform: "LinkedIn", posts: 12, reach: "8.4K", engagement: "7.2%" },
  { platform: "YouTube", posts: 6, reach: "5.1K", engagement: "6.8%" },
];

export default function Analytics() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track performance and insights from your AI-generated content
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="30days">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="12months">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className={`text-xs flex items-center gap-1 mt-1 ${
                metric.trend === 'up' ? 'text-success' : 'text-destructive'
              }`}>
                {metric.trend === 'up' ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {metric.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Posts */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Top Performing Posts</CardTitle>
            <CardDescription>Your best content from AI generation workflows</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPosts.map((post, index) => (
                <div key={post.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm">
                    #{index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{post.title}</h4>
                    <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                      <span>{post.platform}</span>
                      <span>{post.reach} reach</span>
                      <span className="text-success">{post.engagement} engagement</span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Platform Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Performance</CardTitle>
            <CardDescription>Breakdown by social media platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {platformData.map((platform) => (
                <div key={platform.platform} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm">
                      {platform.platform.slice(0, 2)}
                    </div>
                    <div>
                      <h4 className="font-medium">{platform.platform}</h4>
                      <p className="text-sm text-muted-foreground">{platform.posts} posts</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{platform.reach}</div>
                    <div className="text-sm text-success">{platform.engagement}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Insights</CardTitle>
          <CardDescription>Automated recommendations from your content performance data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg bg-success/5 border-success/20">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="font-medium text-success">Optimal Posting Time</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your audience is most active between 8-10 AM. Consider scheduling more content during this window.
              </p>
            </div>
            <div className="p-4 border rounded-lg bg-primary/5 border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="h-4 w-4 text-primary" />
                <span className="font-medium text-primary">Content Style</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Behind-the-scenes content performs 23% better than product-focused posts for your audience.
              </p>
            </div>
            <div className="p-4 border rounded-lg bg-warning/5 border-warning/20">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-warning" />
                <span className="font-medium text-warning">Posting Frequency</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Increase Instagram posts to 5-7 per week for optimal engagement growth.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Recycling Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle>Content Recycling Opportunities</CardTitle>
          <CardDescription>High-performing content that can be repurposed</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPosts.slice(0, 2).map((post) => (
              <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium">{post.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{post.platform}</span>
                      <span className="text-success">{post.engagement} engagement</span>
                      <Badge variant="secondary">High performer</Badge>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Recycle Content
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}