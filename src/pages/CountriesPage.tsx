import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, Users, Search, ChevronDown, ChevronRight } from "lucide-react";
import { allCountries } from "@/data/countries";

type Alignment = "ally" | "neutral" | "adversary";
type VotingTendency = "for" | "against" | "abstain" | "unknown";

interface CountryState {
  position: string;
  alignment: Alignment;
  votingTendency: VotingTendency;
  speechNotes: string;
}

const alignmentColors: Record<Alignment, string> = {
  ally: "bg-success/20 text-success border-success/30",
  neutral: "bg-warning/20 text-warning border-warning/30",
  adversary: "bg-destructive/20 text-destructive border-destructive/30",
};

const regions = ["All", "Africa", "Asia-Pacific", "Eastern Europe", "GRULAC", "WEOG"] as const;

export default function CountriesPage() {
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState<string>("All");
  const [alignmentFilter, setAlignmentFilter] = useState<string>("all");
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null);
  const [countryStates, setCountryStates] = useState<Record<string, CountryState>>({});

  const getState = (name: string): CountryState =>
    countryStates[name] || { position: "", alignment: "neutral", votingTendency: "unknown", speechNotes: "" };

  const updateState = (name: string, updates: Partial<CountryState>) => {
    setCountryStates((prev) => ({
      ...prev,
      [name]: { ...getState(name), ...updates },
    }));
  };

  const filtered = useMemo(() => {
    return allCountries.filter((c) => {
      if (regionFilter !== "All" && c.region !== regionFilter) return false;
      if (alignmentFilter !== "all" && getState(c.name).alignment !== alignmentFilter) return false;
      if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [search, regionFilter, alignmentFilter, countryStates]);

  const counts = useMemo(() => {
    const a = { ally: 0, neutral: 0, adversary: 0 };
    allCountries.forEach((c) => { a[getState(c.name).alignment]++; });
    return a;
  }, [countryStates]);

  return (
    <div className="space-y-4 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">Countries Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">All 193 UN GA member states</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <Badge variant="outline" className={alignmentColors.ally}>{counts.ally} Allies</Badge>
          <Badge variant="outline" className={alignmentColors.adversary}>{counts.adversary} Adversaries</Badge>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="h-4 w-4" />
            {filtered.length}/{allCountries.length}
          </div>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search countries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-muted border-border pl-8"
          />
        </div>
        <Select value={regionFilter} onValueChange={setRegionFilter}>
          <SelectTrigger className="w-[160px] bg-muted border-border text-sm">
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent>
            {regions.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={alignmentFilter} onValueChange={setAlignmentFilter}>
          <SelectTrigger className="w-[140px] bg-muted border-border text-sm">
            <SelectValue placeholder="Alignment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="ally">Ally</SelectItem>
            <SelectItem value="neutral">Neutral</SelectItem>
            <SelectItem value="adversary">Adversary</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        {filtered.map((country) => {
          const state = getState(country.name);
          const isExpanded = expandedCountry === country.name;
          return (
            <Card key={country.name} className="bg-card border-border">
              <div
                className="flex items-center justify-between px-4 py-2.5 cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => setExpandedCountry(isExpanded ? null : country.name)}
              >
                <div className="flex items-center gap-3">
                  {isExpanded ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                  <Globe className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{country.name}</span>
                  <span className="text-xs text-muted-foreground">{country.region}</span>
                </div>
                <div className="flex items-center gap-2">
                  {state.votingTendency !== "unknown" && (
                    <span className="text-xs text-muted-foreground capitalize">{state.votingTendency}</span>
                  )}
                  <Badge className={`text-xs border ${alignmentColors[state.alignment]}`}>
                    {state.alignment.toUpperCase()}
                  </Badge>
                </div>
              </div>
              {isExpanded && (
                <CardContent className="pt-0 pb-3 space-y-3 border-t border-border/50">
                  <div className="pt-3">
                    <label className="text-xs text-muted-foreground mb-1 block">Position on Immigration</label>
                    <Textarea
                      value={state.position}
                      onChange={(e) => updateState(country.name, { position: e.target.value })}
                      className="bg-muted/30 border-border/50 text-sm min-h-[50px] resize-none"
                      placeholder="Country's stance..."
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="text-xs text-muted-foreground mb-1 block">Alignment</label>
                      <Select value={state.alignment} onValueChange={(v) => updateState(country.name, { alignment: v as Alignment })}>
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
                      <Select value={state.votingTendency} onValueChange={(v) => updateState(country.name, { votingTendency: v as VotingTendency })}>
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
                      value={state.speechNotes}
                      onChange={(e) => updateState(country.name, { speechNotes: e.target.value })}
                      className="bg-muted/30 border-border/50 text-sm min-h-[40px] resize-none"
                      placeholder="Notes from their speeches..."
                    />
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
