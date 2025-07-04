import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, MoreHorizontal, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const scheduledPosts = [
  {
    id: 1,
    title: "Morning Motivation Post",
    platform: "Instagram",
    date: "2024-01-15",
    time: "08:00",
    status: "scheduled",
    engagement_pred: "High"
  },
  {
    id: 2,
    title: "Product Showcase Video",
    platform: "TikTok", 
    date: "2024-01-15",
    time: "18:00",
    status: "scheduled",
    engagement_pred: "Medium"
  },
  {
    id: 3,
    title: "Behind the Scenes",
    platform: "YouTube",
    date: "2024-01-16",
    time: "12:00", 
    status: "scheduled",
    engagement_pred: "High"
  },
  {
    id: 4,
    title: "Industry Insights",
    platform: "LinkedIn",
    date: "2024-01-17",
    time: "09:00",
    status: "scheduled",
    engagement_pred: "Medium"
  }
];

const platformColors = {
  Instagram: "bg-gradient-to-r from-purple-500 to-pink-500",
  TikTok: "bg-black",
  YouTube: "bg-red-500",
  LinkedIn: "bg-blue-600",
  Twitter: "bg-blue-400"
};

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getPostsForDate = (date: string) => {
    return scheduledPosts.filter(post => post.date === date);
  };

  const dates = Array.from({length: 7}, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Content Calendar</h1>
          <p className="text-muted-foreground">
            Manage and schedule your AI-generated content across platforms
          </p>
        </div>
        <Button variant="gradient">
          <Plus className="mr-2 h-4 w-4" />
          Schedule New Post
        </Button>
      </div>

      {/* Calendar View */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        {dates.map((date) => {
          const dateStr = date.toISOString().split('T')[0];
          const posts = getPostsForDate(dateStr);
          const isToday = dateStr === new Date().toISOString().split('T')[0];
          
          return (
            <Card key={dateStr} className={`${isToday ? 'ring-2 ring-primary' : ''}`}>
              <CardHeader className="pb-3">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div className={`text-lg font-semibold ${isToday ? 'text-primary' : ''}`}>
                    {date.getDate()}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      className="p-2 rounded-md bg-muted/50 border-l-4 border-primary hover:bg-muted transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate">{post.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className={`w-2 h-2 rounded-full ${platformColors[post.platform as keyof typeof platformColors]}`}></div>
                            <span className="text-xs text-muted-foreground">{post.time}</span>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Reschedule</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                  {posts.length === 0 && (
                    <div className="text-center py-4">
                      <CalendarIcon className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
                      <p className="text-xs text-muted-foreground">No posts scheduled</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Scheduled Posts List */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Posts</CardTitle>
          <CardDescription>All scheduled content with engagement predictions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scheduledPosts.map((post) => (
              <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg ${platformColors[post.platform as keyof typeof platformColors]} flex items-center justify-center text-white font-bold text-sm`}>
                    {post.platform.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-medium">{post.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarIcon className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                      <Clock className="h-3 w-3 ml-2" />
                      {post.time}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={post.engagement_pred === "High" ? "default" : "secondary"}
                    className={post.engagement_pred === "High" ? "bg-success" : ""}
                  >
                    {post.engagement_pred} Engagement
                  </Badge>
                  <Badge variant="outline">{post.platform}</Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit Post</DropdownMenuItem>
                      <DropdownMenuItem>Change Time</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem>Preview</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Cancel</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}