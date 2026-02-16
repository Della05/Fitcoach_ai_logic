import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { 
  TrendingUp, 
  BarChart3, 
  Dumbbell, 
  Apple, 
  Footprints, 
  Moon,
  CheckCircle2,
  AlertCircle,
  Target,
  Sparkles,
  FileText,
  Pencil,
  Check
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface AnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientName: string;
  analysisResult: string | null;
}

interface ParsedAnalysis {
  status: string;
  confidenceScore: number;
  nextBestAction: string;
  reasoning: string;
  workout: string;
  nutrition: string;
  movement: string;
  sleep: string;
}

// Improved extraction that captures multi-line content until the next section header
const extractSection = (text: string, sectionName: string): string => {
  // Match section name followed by content until next section header or end
  const regex = new RegExp(
    `${sectionName}[:\\s]*([\\s\\S]*?)(?=\\n(?:Status|Confidence\\s*Score|Next\\s*Best\\s*Action|Reasoning|Workout|Nutrition|Movement|Sleep)[:\\s]|$)`,
    'i'
  );
  const match = text.match(regex);
  return match ? match[1].trim() : "";
};

// Extract confidence score as a number
const extractConfidenceScore = (text: string): number => {
  const regex = /Confidence\s*Score[:\s]*(\d+)/i;
  const match = text.match(regex);
  return match ? parseInt(match[1], 10) : 0;
};

const parseAnalysisResult = (result: string | null): ParsedAnalysis | null => {
  if (!result) return null;
  
  // Try to parse as JSON first
  try {
    const parsed = JSON.parse(result);
    return {
      status: parsed.status || "On Track",
      confidenceScore: parsed.confidence || parsed.confidenceScore || 0,
      nextBestAction: parsed.next_best_action || parsed.nextBestAction || "",
      reasoning: parsed.summary || parsed.reasoning || "",
      workout: parsed.workout_insights || parsed.workout || "",
      nutrition: parsed.nutrition_insights || parsed.nutrition || "",
      movement: parsed.movement_insights || parsed.movement || "",
      sleep: parsed.sleep_insights || parsed.sleep || "",
    };
  } catch {
    // Fallback: treat as plain text
    return {
      status: "Analyzed",
      confidenceScore: 0,
      nextBestAction: "",
      reasoning: result,
      workout: "",
      nutrition: "",
      movement: "",
      sleep: "",
    };
  }
};

const getStatusColor = (status: string) => {
  const lower = status.toLowerCase();
  if (lower.includes("green") || lower.includes("on track") || lower.includes("good") || lower.includes("excellent")) {
    return "bg-success/20 text-success border-success/30";
  }
  if (lower.includes("yellow") || lower.includes("warning") || lower.includes("attention") || lower.includes("needs")) {
    return "bg-warning/20 text-warning border-warning/30";
  }
  if (lower.includes("red") || lower.includes("critical") || lower.includes("urgent")) {
    return "bg-destructive/20 text-destructive border-destructive/30";
  }
  return "bg-primary/20 text-primary border-primary/30";
};

const AnalysisModal = ({ isOpen, onClose, clientName, analysisResult }: AnalysisModalProps) => {
  const parsed = parseAnalysisResult(analysisResult);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState<ParsedAnalysis | null>(null);

  // Initialize edited content when parsed changes
  useEffect(() => {
    if (parsed) {
      setEditedContent({ ...parsed });
    }
  }, [analysisResult]);

  // Reset edit mode when modal closes
  useEffect(() => {
    if (!isOpen) {
      setIsEditing(false);
    }
  }, [isOpen]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleApproveAndSave = () => {
    setIsEditing(false);
    toast.success("Analysis saved", {
      description: "Your edits have been approved and saved.",
    });
  };

  const updateField = (field: keyof ParsedAnalysis, value: string | number) => {
    if (editedContent) {
      setEditedContent({ ...editedContent, [field]: value });
    }
  };

  // Use edited content when available, otherwise fall back to parsed
  const displayContent = editedContent || parsed;

  // Check if we have category-specific data
  const hasCategories = displayContent && (displayContent.workout || displayContent.nutrition || displayContent.movement || displayContent.sleep);

  const sections = [
    { id: "workout", field: "workout" as keyof ParsedAnalysis, icon: Dumbbell, label: "Workout", content: displayContent?.workout, color: "text-primary" },
    { id: "nutrition", field: "nutrition" as keyof ParsedAnalysis, icon: Apple, label: "Nutrition", content: displayContent?.nutrition, color: "text-success" },
    { id: "movement", field: "movement" as keyof ParsedAnalysis, icon: Footprints, label: "Movement", content: displayContent?.movement, color: "text-warning" },
    { id: "sleep", field: "sleep" as keyof ParsedAnalysis, icon: Moon, label: "Sleep", content: displayContent?.sleep, color: "text-info" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Performance Analysis
              </DialogTitle>
              <DialogDescription>
                Weekly performance report for {clientName}
              </DialogDescription>
            </div>
            {displayContent && (
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <Button 
                    variant="default" 
                    size="sm" 
                    onClick={handleApproveAndSave}
                    className="gap-1"
                  >
                    <Check className="w-4 h-4" />
                    Approve & Save
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleEdit}
                    className="gap-1"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </Button>
                )}
              </div>
            )}
          </div>
        </DialogHeader>
        
        <ScrollArea className="max-h-[65vh] pr-4">
          <div className="space-y-4 py-2">
            {displayContent ? (
              <>
                {/* Top Stats Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col items-center p-3 rounded-lg bg-secondary/50 text-center">
                    <CheckCircle2 className="w-4 h-4 text-success mb-1" />
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Status</span>
                    <Badge className={`mt-1 text-xs ${getStatusColor(displayContent.status)}`}>
                      {displayContent.status}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-col items-center p-3 rounded-lg bg-secondary/50 text-center">
                    <Target className="w-4 h-4 text-primary mb-1" />
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Confidence</span>
                    <span className="font-bold text-lg text-primary">
                      {displayContent.confidenceScore > 0 ? `${displayContent.confidenceScore}%` : "N/A"}
                    </span>
                  </div>
                </div>

                {/* Next Best Action */}
                {(displayContent.nextBestAction || isEditing) && (
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <h4 className="font-semibold text-sm">Next Best Action</h4>
                    </div>
                    {isEditing ? (
                      <Textarea
                        value={editedContent?.nextBestAction || ""}
                        onChange={(e) => updateField("nextBestAction", e.target.value)}
                        className="min-h-[80px] text-sm"
                        placeholder="Enter the next best action..."
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                        {displayContent.nextBestAction}
                      </p>
                    )}
                  </div>
                )}

                <Separator />

                {/* Tabbed Content */}
                <Tabs defaultValue={hasCategories ? "workout" : "reasoning"} className="w-full">
                  <TabsList className="w-full grid grid-cols-5 h-auto">
                    <TabsTrigger value="reasoning" className="text-xs px-2 py-1.5">
                      <FileText className="w-3 h-3 mr-1" />
                      Summary
                    </TabsTrigger>
                    {sections.map((section) => (
                      <TabsTrigger 
                        key={section.id} 
                        value={section.id}
                        className="text-xs px-2 py-1.5"
                        disabled={!section.content && !isEditing}
                      >
                        <section.icon className={`w-3 h-3 mr-1 ${section.color}`} />
                        {section.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {/* Reasoning/Summary Tab */}
                  <TabsContent value="reasoning" className="mt-4">
                    <div className="p-4 rounded-lg bg-secondary/30 border border-border/50">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <h4 className="font-semibold text-sm">Analysis Summary</h4>
                      </div>
                      {isEditing ? (
                        <Textarea
                          value={editedContent?.reasoning || ""}
                          onChange={(e) => updateField("reasoning", e.target.value)}
                          className="min-h-[120px] text-sm"
                          placeholder="Enter the analysis summary..."
                        />
                      ) : (
                        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                          {displayContent.reasoning || "No detailed analysis available."}
                        </p>
                      )}
                    </div>
                  </TabsContent>

                  {/* Category Tabs */}
                  {sections.map((section) => (
                    <TabsContent key={section.id} value={section.id} className="mt-4">
                      <div className="p-4 rounded-lg bg-secondary/30 border border-border/50">
                        <div className="flex items-center gap-2 mb-3">
                          <section.icon className={`w-4 h-4 ${section.color}`} />
                          <h4 className="font-semibold text-sm">{section.label} Insights</h4>
                        </div>
                        {isEditing ? (
                          <Textarea
                            value={(editedContent?.[section.field] as string) || ""}
                            onChange={(e) => updateField(section.field, e.target.value)}
                            className="min-h-[120px] text-sm"
                            placeholder={`Enter ${section.label.toLowerCase()} insights...`}
                          />
                        ) : (
                          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                            {section.content || "No data available for this category."}
                          </p>
                        )}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <AlertCircle className="w-10 h-10 text-muted-foreground mb-3" />
                <p className="text-sm text-muted-foreground">
                  No analysis data available.
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AnalysisModal;
