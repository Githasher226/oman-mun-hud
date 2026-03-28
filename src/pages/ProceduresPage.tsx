import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gavel, ListOrdered, MessageSquare, Vote, ArrowRight } from "lucide-react";

const motionTypes = [
  { name: "Motion to Open Debate", desc: "Opens discussion on a topic", priority: "High" },
  { name: "Motion to Set Agenda", desc: "Proposes the order of topics to discuss", priority: "High" },
  { name: "Motion for Moderated Caucus", desc: "Structured debate with speaking time limits", priority: "Medium" },
  { name: "Motion for Unmoderated Caucus", desc: "Informal negotiation period", priority: "Medium" },
  { name: "Motion to Close Debate", desc: "Ends current discussion, moves to voting", priority: "Low" },
  { name: "Motion to Table", desc: "Postpones discussion on current topic", priority: "Low" },
  { name: "Motion to Adjourn", desc: "Ends the session", priority: "Low" },
];

const debateFlow = [
  "Roll Call",
  "Setting the Agenda",
  "Opening Speeches",
  "Primary Speakers List",
  "Moderated Caucus",
  "Unmoderated Caucus",
  "Draft Resolutions",
  "Voting Procedure",
  "Closing",
];

export default function ProceduresPage() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">
          Committee & Procedure Panel
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Quick reference for GA 2nd & 3rd Committee — Immigration
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-display flex items-center gap-2 text-primary">
              <ListOrdered className="h-4 w-4" />
              Debate Flow
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {debateFlow.map((step, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <span className="font-mono text-xs text-muted-foreground w-5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <ArrowRight className="h-3 w-3 text-primary/50" />
                  <span className="text-foreground">{step}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-display flex items-center gap-2 text-primary">
              <MessageSquare className="h-4 w-4" />
              Primary Speakers List
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-secondary-foreground space-y-3">
            <p>
              The <strong className="text-foreground">Primary Speakers List (PSL)</strong> is established at the start of debate. Delegates add their names to speak on the overall topic.
            </p>
            <ul className="space-y-1.5 list-disc list-inside text-muted-foreground">
              <li>Each delegate gets a set time (usually 60–90 seconds)</li>
              <li>Used to introduce your country's position</li>
              <li>Can yield time to another delegate, questions, or the chair</li>
              <li>Exhaustion of PSL leads to voting procedure</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-display flex items-center gap-2 text-primary">
            <Gavel className="h-4 w-4" />
            Motion Types
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {motionTypes.map((motion) => (
              <div
                key={motion.name}
                className="flex items-center justify-between p-3 rounded-md bg-muted/30 border border-border/50"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{motion.name}</p>
                  <p className="text-xs text-muted-foreground">{motion.desc}</p>
                </div>
                <Badge
                  variant={motion.priority === "High" ? "default" : "secondary"}
                  className={motion.priority === "High" ? "bg-primary text-primary-foreground" : ""}
                >
                  {motion.priority}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-display flex items-center gap-2 text-primary">
            <Vote className="h-4 w-4" />
            Key Reminders
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-secondary-foreground space-y-2">
          <p>• GA resolutions are <strong className="text-warning">non-binding</strong> — they are policy recommendations only.</p>
          <p>• The ICJ has upheld that GA resolutions are only binding on other UN institutions.</p>
          <p>• Immigration is too broad — be prepared to narrow to specific subtopics.</p>
          <p>• This simulation covers both <strong className="text-foreground">2nd Committee</strong> (economic/labor) and <strong className="text-foreground">3rd Committee</strong> (social/humanitarian) issues.</p>
        </CardContent>
      </Card>
    </div>
  );
}
