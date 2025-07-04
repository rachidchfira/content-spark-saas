import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Sparkles, 
  Video, 
  Image as ImageIcon, 
  FileText, 
  Loader2,
  CheckCircle,
  Instagram,
  Youtube,
  Twitter
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const platforms = [
  { value: "instagram", label: "Instagram", icon: Instagram },
  { value: "tiktok", label: "TikTok", icon: Video },
  { value: "youtube", label: "YouTube", icon: Youtube },
  { value: "linkedin", label: "LinkedIn", icon: FileText },
  { value: "twitter", label: "Twitter", icon: Twitter },
];

const contentTypes = [
  { value: "reel", label: "Short Video/Reel", icon: Video },
  { value: "story", label: "Story", icon: ImageIcon },
  { value: "post", label: "Feed Post", icon: FileText },
  { value: "carousel", label: "Carousel", icon: ImageIcon },
];

const tones = [
  "Professional", "Casual", "Energetic", "Inspiring", "Educational", "Humorous"
];

export default function CreateContent() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    niche: "",
    contentType: "",
    platform: "",
    audience: "",
    tone: "",
    keywords: "",
    additionalInstructions: ""
  });

  const handleGenerate = async () => {
    if (!formData.niche || !formData.contentType || !formData.platform) {
      toast({
        title: "Missing Information",
        description: "Please fill in the required fields to generate content.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call to n8n workflow
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock generated content
      setGeneratedContent({
        script: "🌟 Ready to transform your morning routine? Here's the game-changing tip that successful entrepreneurs swear by...\n\nStart with gratitude - just 2 minutes can shift your entire day's energy! ✨\n\n#MorningMotivation #SuccessHabits #Entrepreneur",
        hashtags: ["#MorningMotivation", "#SuccessHabits", "#Entrepreneur", "#Productivity"],
        captions: "Transform your mornings, transform your life! What's your go-to morning habit?",
        suggestions: [
          "Use energetic background music",
          "Add text overlay with key points",
          "Include a call-to-action in comments"
        ]
      });

      toast({
        title: "Content Generated!",
        description: "Your AI-powered content is ready for review.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "There was an error generating your content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApprove = async () => {
    toast({
      title: "Content Approved!",
      description: "Your content has been sent to the publishing workflow.",
    });
    setGeneratedContent(null);
    setFormData({
      niche: "",
      contentType: "",
      platform: "",
      audience: "",
      tone: "",
      keywords: "",
      additionalInstructions: ""
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Create AI Content</h1>
        <p className="text-muted-foreground">
          Generate engaging social media content powered by AI workflows
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Content Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Content Requirements
            </CardTitle>
            <CardDescription>
              Provide details about the content you want to create
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="niche">Niche/Industry *</Label>
              <Input
                id="niche"
                placeholder="e.g., Fitness, Technology, Fashion"
                value={formData.niche}
                onChange={(e) => setFormData(prev => ({ ...prev, niche: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label>Content Type *</Label>
              <Select value={formData.contentType} onValueChange={(value) => setFormData(prev => ({ ...prev, contentType: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  {contentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <type.icon className="h-4 w-4" />
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Platform *</Label>
              <Select value={formData.platform} onValueChange={(value) => setFormData(prev => ({ ...prev, platform: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map((platform) => (
                    <SelectItem key={platform.value} value={platform.value}>
                      <div className="flex items-center gap-2">
                        <platform.icon className="h-4 w-4" />
                        {platform.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="audience">Target Audience</Label>
              <Input
                id="audience"
                placeholder="e.g., Young professionals, fitness enthusiasts"
                value={formData.audience}
                onChange={(e) => setFormData(prev => ({ ...prev, audience: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label>Brand Tone</Label>
              <Select value={formData.tone} onValueChange={(value) => setFormData(prev => ({ ...prev, tone: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  {tones.map((tone) => (
                    <SelectItem key={tone} value={tone.toLowerCase()}>
                      {tone}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="keywords">Keywords</Label>
              <Input
                id="keywords"
                placeholder="Comma-separated keywords"
                value={formData.keywords}
                onChange={(e) => setFormData(prev => ({ ...prev, keywords: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructions">Additional Instructions</Label>
              <Textarea
                id="instructions"
                placeholder="Any specific requirements or preferences..."
                value={formData.additionalInstructions}
                onChange={(e) => setFormData(prev => ({ ...prev, additionalInstructions: e.target.value }))}
              />
            </div>

            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating}
              className="w-full"
              variant="gradient"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Content...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate AI Content
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Content Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Generated Content
            </CardTitle>
            <CardDescription>
              Review and approve your AI-generated content
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!generatedContent && !isGenerating && (
              <div className="text-center py-12 text-muted-foreground">
                <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Fill out the form and click "Generate AI Content" to see your content preview here.</p>
              </div>
            )}

            {isGenerating && (
              <div className="text-center py-12">
                <Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin text-primary" />
                <p className="text-muted-foreground">AI is crafting your perfect content...</p>
              </div>
            )}

            {generatedContent && (
              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-semibold">Script/Caption</Label>
                  <div className="mt-2 p-4 bg-muted rounded-lg">
                    <p className="whitespace-pre-wrap">{generatedContent.script}</p>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-semibold">Hashtags</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {generatedContent.hashtags.map((tag: string, index: number) => (
                      <Badge key={index} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-semibold">Additional Caption</Label>
                  <div className="mt-2 p-4 bg-muted rounded-lg">
                    <p>{generatedContent.captions}</p>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-semibold">AI Suggestions</Label>
                  <div className="mt-2 space-y-2">
                    {generatedContent.suggestions.map((suggestion: string, index: number) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                        <span>{suggestion}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="flex gap-3">
                  <Button onClick={handleApprove} variant="success" className="flex-1">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve & Schedule
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Edit Content
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}