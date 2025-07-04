import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Repeat,
  TrendingUp,
  Calendar,
  Copy,
  Sparkles,
  Clock,
  BarChart3,
  CheckCircle,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const topPerformers = [
  {
    id: 1,
    title: "5 Morning Habits That Changed My Life",
    platform: "Instagram",
    originalDate: "2024-01-05",
    engagement: "15.2%",
    reach: "12.5K",
    type: "Reel",
    performance: "exceptional"
  },
  {
    id: 2, 
    title: "Behind the Scenes: Product Development",
    platform: "TikTok",
    originalDate: "2024-01-03",
    engagement: "12.8%",
    reach: "8.9K", 
    type: "Video",
    performance: "high"
  },
  {
    id: 3,
    title: "Industry Trends: What's Coming in 2024",
    platform: "LinkedIn",
    originalDate: "2023-12-28",
    engagement: "11.4%",
    reach: "6.2K",
    type: "Article",
    performance: "high"
  },
  {
    id: 4,
    title: "Customer Success Story",
    platform: "YouTube", 
    originalDate: "2023-12-25",
    engagement: "9.8%",
    reach: "4.1K",
    type: "Short",
    performance: "good"
  }
];

const recycleOpportunities = [
  {
    id: 1,
    title: "Transform Instagram Reel into LinkedIn carousel",
    originalContent: "5 Morning Habits That Changed My Life", 
    suggestedPlatform: "LinkedIn",
    estimatedEngagement: "+20%",
    confidence: "High"
  },
  {
    id: 2,
    title: "Create Twitter thread from TikTok video",
    originalContent: "Behind the Scenes: Product Development",
    suggestedPlatform: "Twitter", 
    estimatedEngagement: "+15%",
    confidence: "Medium"
  },
  {
    id: 3,
    title: "Turn LinkedIn article into YouTube video",
    originalContent: "Industry Trends: What's Coming in 2024",
    suggestedPlatform: "YouTube",
    estimatedEngagement: "+25%", 
    confidence: "High"
  }
];

export default function Recycle() {
  const { toast } = useToast();
  const [recyclingStates, setRecyclingStates] = useState<Record<number, boolean>>({});

  const handleRecycle = async (contentId: number, title: string) => {
    setRecyclingStates(prev => ({ ...prev, [contentId]: true }));
    
    // Simulate API call to n8n workflow
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Content Recycled!",
        description: `"${title}" has been transformed and added to your content queue.`,
      });
    } catch (error) {
      toast({
        title: "Recycling Failed",
        description: "There was an error recycling your content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setRecyclingStates(prev => ({ ...prev, [contentId]: false }));
    }
  };

  const getPerformanceBadge = (performance: string) => {
    switch (performance) {
      case "exceptional": 
        return <Badge className="bg-gradient-primary text-primary-foreground">Exceptional</Badge>;
      case "high":
        return <Badge variant="success">High Performer</Badge>;
      case "good":
        return <Badge variant="secondary">Good</Badge>;
      default:
        return <Badge variant="outline">Average</Badge>;
    }
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence.toLowerCase()) {
      case "high": return "text-success";
      case "medium": return "text-warning";
      case "low": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Content Recycling</h1>
        <p className="text-muted-foreground">
          Transform your high-performing content for different platforms using AI
        </p>
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Recyclable</CardTitle>
            <Repeat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{topPerformers.length}</div>
            <p className="text-xs text-success flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              +2 this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Performance Boost</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+18%</div>
            <p className="text-xs text-success flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              Based on recycled content
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Saved</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24h</div>
            <p className="text-xs text-success flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* AI Recycling Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Recycling Opportunities
          </CardTitle>
          <CardDescription>
            Smart suggestions to transform your content across platforms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recycleOpportunities.map((opportunity) => (
              <div key={opportunity.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{opportunity.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      From: "{opportunity.originalContent}"
                    </p>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="text-muted-foreground">
                        Target: {opportunity.suggestedPlatform}
                      </span>
                      <span className="text-success">
                        {opportunity.estimatedEngagement} estimated boost
                      </span>
                      <span className={getConfidenceColor(opportunity.confidence)}>
                        {opportunity.confidence} confidence
                      </span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleRecycle(opportunity.id, opportunity.title)}
                    disabled={recyclingStates[opportunity.id]}
                    variant="gradient"
                  >
                    {recyclingStates[opportunity.id] ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Recycling...
                      </>
                    ) : (
                      <>
                        <Repeat className="mr-2 h-4 w-4" />
                        Recycle
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Performing Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-success" />
            Top Performing Content
          </CardTitle>
          <CardDescription>
            Your best content eligible for recycling across platforms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPerformers.map((content) => (
              <div key={content.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium">{content.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span>{content.platform}</span>
                      <span>{content.type}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(content.originalDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right text-sm">
                    <div className="font-medium">{content.reach} reach</div>
                    <div className="text-success">{content.engagement} engagement</div>
                  </div>
                  {getPerformanceBadge(content.performance)}
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleRecycle(content.id, content.title)}
                      disabled={recyclingStates[content.id]}
                    >
                      {recyclingStates[content.id] ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Repeat className="h-3 w-3" />
                      )}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recycling History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-success" />
            Recent Recycling Activity
          </CardTitle>
          <CardDescription>
            Track your content transformation results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-success" />
                </div>
                <div>
                  <h4 className="font-medium">Instagram → LinkedIn Transformation</h4>
                  <p className="text-sm text-muted-foreground">
                    "5 Morning Habits" converted to professional carousel
                  </p>
                </div>
              </div>
              <div className="text-right text-sm">
                <div className="text-success">+22% engagement</div>
                <div className="text-muted-foreground">2 hours ago</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-success" />
                </div>
                <div>
                  <h4 className="font-medium">TikTok → Twitter Thread</h4>
                  <p className="text-sm text-muted-foreground">
                    Product development video turned into Twitter thread
                  </p>
                </div>
              </div>
              <div className="text-right text-sm">
                <div className="text-success">+18% engagement</div>
                <div className="text-muted-foreground">1 day ago</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}