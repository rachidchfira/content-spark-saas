import { 
  TrendingUp, 
  Users, 
  Calendar,
  PenTool,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-image.jpg";

const stats = [
  { title: "Total Posts", value: "124", change: "+12%", icon: PenTool },
  { title: "Engagement Rate", value: "8.4%", change: "+2.1%", icon: TrendingUp },
  { title: "Followers", value: "12.5K", change: "+5.2%", icon: Users },
  { title: "Scheduled", value: "23", change: "+8", icon: Calendar },
];

const recentContent = [
  { id: 1, title: "Summer Marketing Campaign", status: "published", platform: "Instagram", engagement: "95%" },
  { id: 2, title: "Product Launch Video", status: "scheduled", platform: "TikTok", engagement: "pending" },
  { id: 3, title: "Brand Story Series", status: "draft", platform: "LinkedIn", engagement: "pending" },
  { id: 4, title: "Customer Testimonials", status: "published", platform: "YouTube", engagement: "87%" },
];

const statusColors = {
  published: "success",
  scheduled: "warning", 
  draft: "secondary"
} as const;

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-primary p-8 text-primary-foreground">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome back to BrandingAI</h1>
          <p className="text-lg text-primary-foreground/80 mb-6">
            Your AI-powered content creation studio is ready to amplify your brand.
          </p>
          <div className="flex gap-3">
            <Button variant="secondary" size="lg">
              <PenTool className="mr-2 h-4 w-4" />
              Create Content
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              View Analytics
            </Button>
          </div>
        </div>
        <div className="absolute inset-0 opacity-20">
          <img 
            src={heroImage} 
            alt="AI Dashboard"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-success flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Content */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Content</CardTitle>
            <CardDescription>Your latest AI-generated content and campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentContent.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <PenTool className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.platform}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={statusColors[item.status] as any}>
                      {item.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{item.engagement}</span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Content
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and workflows</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <PenTool className="mr-2 h-4 w-4" />
              Generate New Content
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Post
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <BarChart3 className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <CheckCircle className="mr-2 h-4 w-4" />
              Review Drafts
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Workflow Status */}
      <Card>
        <CardHeader>
          <CardTitle>AI Workflow Status</CardTitle>
          <CardDescription>Current automation processes and n8n workflow activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="font-medium">Content Generation</span>
              </div>
              <p className="text-sm text-muted-foreground">3 workflows active</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <span className="font-medium">Analytics Processing</span>
              </div>
              <p className="text-sm text-muted-foreground">Updating metrics</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="font-medium">Social Publishing</span>
              </div>
              <p className="text-sm text-muted-foreground">2 posts scheduled</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}