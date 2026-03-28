import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Trash2, GripVertical, ChevronDown, ChevronUp } from "lucide-react";

interface Clause {
  id: string;
  type: "preambulatory" | "operative";
  text: string;
}

export default function ResolutionPage() {
  const [title, setTitle] = useState("Draft Resolution on International Migration Governance");
  const [sponsors, setSponsors] = useState("Oman");
  const [clauses, setClauses] = useState<Clause[]>([
    { id: "p1", type: "preambulatory", text: "Recalling the Universal Declaration of Human Rights (1948) and its affirmation of fundamental rights for all persons," },
    { id: "p2", type: "preambulatory", text: "Reaffirming the principles of the 1951 Refugee Convention and the 1967 Protocol Relating to the Status of Refugees," },
    { id: "p3", type: "preambulatory", text: "Noting the adoption of the Global Compact for Safe, Orderly and Regular Migration (2018) as a cooperative framework," },
    { id: "p4", type: "preambulatory", text: "Recognizing that international migration contributes to economic development, workforce growth, and cultural exchange," },
    { id: "o1", type: "operative", text: "Calls upon all member states to establish legal, accessible, and safe migration pathways;" },
    { id: "o2", type: "operative", text: "Urges member states to ensure due process protections for all migrants in enforcement proceedings;" },
    { id: "o3", type: "operative", text: "Recommends the development of bilateral and regional agreements for managing labor migration flows;" },
    { id: "o4", type: "operative", text: "Encourages enhanced international cooperation on refugee resettlement and burden-sharing;" },
  ]);
  const [newClauseText, setNewClauseText] = useState("");
  const [newClauseType, setNewClauseType] = useState<"preambulatory" | "operative">("operative");

  const addClause = () => {
    if (!newClauseText.trim()) return;
    setClauses([...clauses, { id: Date.now().toString(), type: newClauseType, text: newClauseText }]);
    setNewClauseText("");
  };

  const removeClause = (id: string) => setClauses(clauses.filter((c) => c.id !== id));

  const moveClause = (index: number, dir: -1 | 1) => {
    const newClauses = [...clauses];
    const target = index + dir;
    if (target < 0 || target >= newClauses.length) return;
    [newClauses[index], newClauses[target]] = [newClauses[target], newClauses[index]];
    setClauses(newClauses);
  };

  const updateClause = (id: string, text: string) => {
    setClauses(clauses.map((c) => (c.id === id ? { ...c, text } : c)));
  };

  const preambulatory = clauses.filter((c) => c.type === "preambulatory");
  const operative = clauses.filter((c) => c.type === "operative");

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-display font-bold flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          Resolution Builder
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          GA resolutions are non-binding recommendations — draft yours here
        </p>
      </div>

      <Card className="bg-card border-border">
        <CardContent className="pt-4 space-y-3">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Resolution Title</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} className="bg-muted border-border font-display" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Sponsors</label>
            <Input value={sponsors} onChange={(e) => setSponsors(e.target.value)} className="bg-muted border-border text-sm" placeholder="Sponsoring nations..." />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-display text-primary flex items-center gap-2">
            Preambulatory Clauses
            <Badge variant="secondary" className="text-xs">{preambulatory.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {clauses.map((clause, idx) =>
            clause.type === "preambulatory" ? (
              <ClauseItem key={clause.id} clause={clause} index={idx} total={clauses.length} onRemove={removeClause} onMove={moveClause} onUpdate={updateClause} />
            ) : null
          )}
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-display text-primary flex items-center gap-2">
            Operative Clauses
            <Badge variant="secondary" className="text-xs">{operative.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {clauses.map((clause, idx) =>
            clause.type === "operative" ? (
              <ClauseItem key={clause.id} clause={clause} index={idx} total={clauses.length} onRemove={removeClause} onMove={moveClause} onUpdate={updateClause} />
            ) : null
          )}
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-display text-primary">Add Clause</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={newClauseType === "preambulatory" ? "default" : "secondary"}
              onClick={() => setNewClauseType("preambulatory")}
              className={newClauseType === "preambulatory" ? "bg-primary text-primary-foreground" : ""}
            >
              Preambulatory
            </Button>
            <Button
              size="sm"
              variant={newClauseType === "operative" ? "default" : "secondary"}
              onClick={() => setNewClauseType("operative")}
              className={newClauseType === "operative" ? "bg-primary text-primary-foreground" : ""}
            >
              Operative
            </Button>
          </div>
          <Textarea
            value={newClauseText}
            onChange={(e) => setNewClauseText(e.target.value)}
            placeholder={newClauseType === "preambulatory" ? "Recalling / Noting / Recognizing..." : "Calls upon / Urges / Recommends..."}
            className="bg-muted border-border text-sm min-h-[60px] resize-none"
          />
          <Button onClick={addClause} size="sm" className="bg-primary text-primary-foreground hover:bg-primary/80">
            <Plus className="h-4 w-4 mr-1" /> Add Clause
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function ClauseItem({ clause, index, total, onRemove, onMove, onUpdate }: {
  clause: Clause; index: number; total: number;
  onRemove: (id: string) => void; onMove: (i: number, d: -1 | 1) => void; onUpdate: (id: string, text: string) => void;
}) {
  const [editing, setEditing] = useState(false);

  return (
    <div className="flex items-start gap-2 p-2 rounded bg-muted/30 border border-border/50 group">
      <GripVertical className="h-4 w-4 text-muted-foreground/30 mt-1 flex-shrink-0" />
      <div className="flex-1">
        {editing ? (
          <Textarea
            value={clause.text}
            onChange={(e) => onUpdate(clause.id, e.target.value)}
            onBlur={() => setEditing(false)}
            autoFocus
            className="bg-muted border-border text-sm min-h-[40px] resize-none"
          />
        ) : (
          <p className="text-sm text-secondary-foreground italic cursor-pointer" onClick={() => setEditing(true)}>
            {clause.text}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button size="sm" variant="ghost" onClick={() => onMove(index, -1)} className="h-5 w-5 p-0 text-muted-foreground">
          <ChevronUp className="h-3 w-3" />
        </Button>
        <Button size="sm" variant="ghost" onClick={() => onMove(index, 1)} className="h-5 w-5 p-0 text-muted-foreground">
          <ChevronDown className="h-3 w-3" />
        </Button>
        <Button size="sm" variant="ghost" onClick={() => onRemove(clause.id)} className="h-5 w-5 p-0 text-muted-foreground hover:text-destructive">
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
