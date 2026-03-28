import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, Plus, Users } from "lucide-react";

type Alignment = "ally" | "neutral" | "adversary";
type VotingTendency = "for" | "against" | "abstain" | "unknown";

interface Country {
  id: string;
  name: string;
  position: string;
  alignment: Alignment;
  votingTendency: VotingTendency;
  speechNotes: string;
}

const initialCountries: Country[] = [
  { id: "1", name: "United States", position: "Strong enforcement stance; ICE broad discretionary powers; contentious domestic politics on illegal immigration.", alignment: "neutral", votingTendency: "unknown", speechNotes: "" },
  { id: "2", name: "Germany", position: "Open to migration for economic reasons (aging population); balances integration policies with workforce needs.", alignment: "ally", votingTendency: "for", speechNotes: "" },
  { id: "3", name: "France", position: "Post-2015 influx led to rising racism; Paris attacks amplified anti-immigrant sentiment; divided public opinion.", alignment: "neutral", votingTendency: "unknown", speechNotes: "" },
  { id: "4", name: "Canada", position: "Toronto as diversity model (~50% immigrants); supportive of multiculturalism; strong integration programs.", alignment: "ally", votingTendency: "for", speechNotes: "" },
];

const alignmentColors: Record<Alignment, string> = {
  ally: "bg-success/20 text-success border-success/30",
  neutral: "bg-warning/20 text-warning border-warning/30",
  adversary: "bg-destructive/20 text-destructive border-destructive/30",
};

export default function CountriesPage() {
  const [countries, setCountries] = useState<Country[]>(initialCountries);
  const [newName, setNewName] = useState("");

  const addCountry = () => {
    if (!newName.trim()) return;
    setCountries([...countries, {
      id: Date.now().toString(), name: newName, position: "", alignment: "neutral", votingTendency: "unknown", speechNotes: "",
    }]);
    setNewName("");
  };

  const updateCountry = (id: string, updates: Partial<Country>) => {
    setCountries(countries.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">Countries Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track positions, alignments, and speech notes for all delegations
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Users className="h-4 w-4" />
          {countries.length} delegations
        </div>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Add a country..."
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addCountry()}
          className="bg-muted border-border"
        />
        <Button onClick={addCountry} size="sm" className="bg-primary text-primary-foreground hover:bg-primary/80">
          <Plus className="h-4 w-4 mr-1" /> Add
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {countries.map((country) => (
          <Card key={country.id} className="bg-card border-border">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-display flex items-center gap-2">
                  <Globe className="h-4 w-4 text-primary" />
                  {country.name}
                </CardTitle>
                <Badge className={`text-xs border ${alignmentColors[country.alignment]}`}>
                  {country.alignment.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Position on Immigration</label>
                <Textarea
                  value={country.position}
                  onChange={(e) => updateCountry(country.id, { position: e.target.value })}
                  className="bg-muted/30 border-border/50 text-sm min-h-[50px] resize-none"
                  placeholder="Country's stance..."
                />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground mb-1 block">Alignment</label>
                  <Select value={country.alignment} onValueChange={(v) => updateCountry(country.id, { alignment: v as Alignment })}>
                    <SelectTrigger className="bg-muted/30 border-border/50 text-sm h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ally">Ally</SelectItem>
                      <SelectItem value="neutral">Neutral</SelectItem>
                      <SelectItem value="adversary">Adversary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground mb-1 block">Voting</label>
                  <Select value={country.votingTendency} onValueChange={(v) => updateCountry(country.id, { votingTendency: v as VotingTendency })}>
                    <SelectTrigger className="bg-muted/30 border-border/50 text-sm h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="for">For</SelectItem>
                      <SelectItem value="against">Against</SelectItem>
                      <SelectItem value="abstain">Abstain</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Speech Notes</label>
                <Textarea
                  value={country.speechNotes}
                  onChange={(e) => updateCountry(country.id, { speechNotes: e.target.value })}
                  className="bg-muted/30 border-border/50 text-sm min-h-[40px] resize-none"
                  placeholder="Notes from their speeches..."
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
