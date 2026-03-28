import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Flag, Shield, MessageCircle, Plus, Trash2 } from "lucide-react";

export default function StrategyPage() {
  const [talkingPoints, setTalkingPoints] = useState([
    "Oman supports orderly, legal migration channels that respect sovereignty while upholding humanitarian obligations.",
    "As a Gulf state, Oman has significant experience managing large migrant worker populations — the Kafala system reforms demonstrate commitment to improvement.",
    "Oman emphasizes regional cooperation in the GCC for managing migration flows and protecting worker rights.",
    "Support for the Global Compact for Safe, Orderly and Regular Migration (2018) as a framework for international cooperation.",
    "Oman advocates that economic migration should benefit both sending and receiving countries — brain drain must be addressed.",
  ]);
  const [newPoint, setNewPoint] = useState("");

  const [clauses, setClauses] = useState([
    "Calls upon member states to establish bilateral agreements ensuring safe and legal migration pathways;",
    "Urges nations to implement fair labor protections for all migrant workers consistent with international standards;",
    "Recommends the creation of regional migration management frameworks modeled on successful cooperation agreements;",
  ]);
  const [newClause, setNewClause] = useState("");

  const addPoint = () => {
    if (!newPoint.trim()) return;
    setTalkingPoints([...talkingPoints, newPoint]);
    setNewPoint("");
  };

  const addClause = () => {
    if (!newClause.trim()) return;
    setClauses([...clauses, newClause]);
    setNewClause("");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-display font-bold flex items-center gap-2">
          <Flag className="h-6 w-6 text-primary" />
          Oman Strategy Core
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Your policy positions, talking points, and draft resolution content
        </p>
      </div>

      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-display flex items-center gap-2 text-primary">
            <Shield className="h-4 w-4" />
            Oman's Foreign Policy on Immigration
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-secondary-foreground space-y-3">
          <p>
            <strong className="text-foreground">Core Position:</strong> Oman supports managed, legal migration that balances economic needs with sovereignty and human rights. As a member of the GCC, Oman has extensive experience with labor migration governance.
          </p>
          <p>
            <strong className="text-foreground">Key Interests:</strong> Labor migration reform (Kafala system modernization), regional cooperation on migration management, protection of migrant workers' rights, economic development through skilled migration, addressing root causes of forced displacement.
          </p>
          <p>
            <strong className="text-foreground">Diplomatic Approach:</strong> Oman is known for its neutral diplomacy and mediation role in the Middle East. Leverage this reputation to build consensus and bridge divides between restrictive and open migration blocs.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-display flex items-center gap-2 text-primary">
            <MessageCircle className="h-4 w-4" />
            Talking Points
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {talkingPoints.map((point, i) => (
            <div key={i} className="flex items-start gap-2 p-2 rounded bg-muted/30 border border-border/50">
              <span className="font-mono text-xs text-primary mt-0.5">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-sm text-secondary-foreground flex-1">{point}</p>
              <Button size="sm" variant="ghost" onClick={() => setTalkingPoints(talkingPoints.filter((_, j) => j !== i))} className="text-muted-foreground hover:text-destructive h-6 w-6 p-0">
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}
          <div className="flex gap-2 mt-2">
            <Input value={newPoint} onChange={(e) => setNewPoint(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addPoint()} placeholder="Add talking point..." className="bg-muted border-border text-sm" />
            <Button onClick={addPoint} size="sm" className="bg-primary text-primary-foreground hover:bg-primary/80">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-display flex items-center gap-2 text-primary">
            Draft Resolution Clauses
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {clauses.map((clause, i) => (
            <div key={i} className="flex items-start gap-2 p-2 rounded bg-muted/30 border border-border/50">
              <span className="font-mono text-xs text-muted-foreground mt-0.5">{i + 1}.</span>
              <p className="text-sm text-secondary-foreground italic flex-1">{clause}</p>
              <Button size="sm" variant="ghost" onClick={() => setClauses(clauses.filter((_, j) => j !== i))} className="text-muted-foreground hover:text-destructive h-6 w-6 p-0">
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}
          <div className="flex gap-2 mt-2">
            <Textarea value={newClause} onChange={(e) => setNewClause(e.target.value)} placeholder="Add draft clause..." className="bg-muted border-border text-sm min-h-[40px] resize-none" />
            <Button onClick={addClause} size="sm" className="bg-primary text-primary-foreground hover:bg-primary/80 self-end">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
