import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Users,
  Plus,
  Mail,
  Shield,
  Settings,
  MoreHorizontal,
  UserPlus,
  Crown
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@company.com",
    role: "Owner",
    status: "active",
    lastActive: "Online now",
    avatar: "JD"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@company.com", 
    role: "Admin",
    status: "active",
    lastActive: "2 hours ago",
    avatar: "SJ"
  },
  {
    id: 3,
    name: "Mike Chen",
    email: "mike@company.com",
    role: "Creator",
    status: "active", 
    lastActive: "1 day ago",
    avatar: "MC"
  },
  {
    id: 4,
    name: "Emma Wilson",
    email: "emma@company.com",
    role: "Viewer",
    status: "pending",
    lastActive: "Invitation sent",
    avatar: "EW"
  }
];

const roles = [
  {
    name: "Owner",
    description: "Full access to all features and billing",
    permissions: ["All permissions", "Billing access", "Team management"]
  },
  {
    name: "Admin", 
    description: "Access to all content and team features",
    permissions: ["Content management", "Analytics", "Team invites", "Integrations"]
  },
  {
    name: "Creator",
    description: "Can create and manage content",
    permissions: ["Content creation", "Publishing", "Analytics viewing"]
  },
  {
    name: "Viewer",
    description: "Read-only access to analytics and content",
    permissions: ["View content", "View analytics"]
  }
];

export default function Team() {
  const { toast } = useToast();
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("");
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  const handleInvite = () => {
    if (!inviteEmail || !inviteRole) {
      toast({
        title: "Missing Information",
        description: "Please enter email and select a role.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Invitation Sent",
      description: `Invitation sent to ${inviteEmail} as ${inviteRole}.`,
    });
    
    setInviteEmail("");
    setInviteRole("");
    setIsInviteOpen(false);
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "owner": return "bg-gradient-primary text-primary-foreground";
      case "admin": return "bg-primary/10 text-primary";
      case "creator": return "bg-success/10 text-success";
      case "viewer": return "bg-secondary text-secondary-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success";
      case "pending": return "bg-warning";
      case "inactive": return "bg-muted-foreground";
      default: return "bg-muted-foreground";
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Team Management</h1>
          <p className="text-muted-foreground">
            Manage your team members and their access permissions
          </p>
        </div>
        <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
          <DialogTrigger asChild>
            <Button variant="gradient">
              <UserPlus className="mr-2 h-4 w-4" />
              Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
              <DialogDescription>
                Send an invitation to join your BrandingAI workspace
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="colleague@company.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select value={inviteRole} onValueChange={setInviteRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.slice(1).map((role) => (
                      <SelectItem key={role.name} value={role.name}>
                        <div>
                          <div className="font-medium">{role.name}</div>
                          <div className="text-sm text-muted-foreground">{role.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleInvite} className="w-full">
                Send Invitation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Team Members */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Team Members ({teamMembers.length})
          </CardTitle>
          <CardDescription>
            People who have access to your BrandingAI workspace
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                    {member.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{member.name}</h4>
                      {member.role === "Owner" && (
                        <Crown className="h-4 w-4 text-warning" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right text-sm">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(member.status)}`}></div>
                      <span className="text-muted-foreground">{member.lastActive}</span>
                    </div>
                  </div>
                  <Badge className={getRoleColor(member.role)}>
                    {member.role}
                  </Badge>
                  {member.role !== "Owner" && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Change Role</DropdownMenuItem>
                        <DropdownMenuItem>Resend Invitation</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Remove Member
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Role Permissions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Role Permissions
          </CardTitle>
          <CardDescription>
            Understand what each role can access and do
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {roles.map((role) => (
              <div key={role.name} className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className={getRoleColor(role.name)}>
                    {role.name}
                  </Badge>
                  {role.name === "Owner" && (
                    <Crown className="h-4 w-4 text-warning" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {role.description}
                </p>
                <div className="space-y-1">
                  {role.permissions.map((permission, index) => (
                    <div key={index} className="text-xs text-muted-foreground flex items-center gap-1">
                      <div className="w-1 h-1 bg-primary rounded-full"></div>
                      {permission}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Team Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Team Settings
          </CardTitle>
          <CardDescription>
            Configure team-wide settings and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Auto-approve Content</h4>
                <p className="text-sm text-muted-foreground">
                  Allow creators to publish content without admin approval
                </p>
              </div>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Brand Guidelines</h4>
                <p className="text-sm text-muted-foreground">
                  Set content guidelines and approval workflows
                </p>
              </div>
              <Button variant="outline" size="sm">Manage</Button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Activity Logs</h4>
                <p className="text-sm text-muted-foreground">
                  View detailed logs of team member activities
                </p>
              </div>
              <Button variant="outline" size="sm">View Logs</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}