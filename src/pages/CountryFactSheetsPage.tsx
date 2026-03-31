import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  ChevronDown,
  ChevronRight,
  Globe,
  Scale,
  Users,
  Shield,
  Swords,
  TrendingUp,
  AlertTriangle,
  MessageSquareQuote,
  BookOpen,
} from "lucide-react";
import { countryFactSheets, type CountryFactSheet } from "@/data/omanResearch";
import { weogFactSheets } from "@/data/weogFactSheets";

const categoryColors: Record<string, string> = {
  ally: "bg-green-900/40 text-green-300 border-green-700/50",
  opposition: "bg-red-900/40 text-red-300 border-red-700/50",
  complex: "bg-yellow-900/40 text-yellow-300 border-yellow-700/50",
};

const categoryLabels: Record<string, string> = {
  ally: "Ally",
  opposition: "Opposition",
  complex: "Complex",
};

function Section({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-border/50 pt-3">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 w-full text-left group"
      >
        {open ? <ChevronDown className="h-3 w-3 text-muted-foreground" /> : <ChevronRight className="h-3 w-3 text-muted-foreground" />}
        <Icon className="h-4 w-4 text-primary" />
        <span className="text-sm font-display font-semibold text-foreground group-hover:text-primary transition-colors">
          {title}
        </span>
      </button>
      {open && <div className="mt-3 ml-7">{children}</div>}
    </div>
  );
}

function CountryCard({ country }: { country: CountryFactSheet }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle
            className="text-base font-display cursor-pointer hover:text-primary transition-colors flex items-center gap-2"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            {country.name}
          </CardTitle>
          <Badge className={`text-xs border ${categoryColors[country.category]}`}>
            {categoryLabels[country.category]}
          </Badge>
        </div>
        {!expanded && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2 ml-6">
            {country.overview.slice(0, 150)}...
          </p>
        )}
      </CardHeader>

      {expanded && (
        <CardContent className="space-y-4 pt-0">
          {/* Overview */}
          <p className="text-sm text-secondary-foreground leading-relaxed">
            {country.overview}
          </p>

          {/* Key Stats */}
          <Section icon={Users} title="Key Population Statistics">
            <div className="grid gap-2">
              {country.keyStats.map((s, i) => (
                <div key={i} className="flex justify-between items-start gap-4 text-sm">
                  <span className="text-muted-foreground">{s.label}</span>
                  <span className="text-foreground font-mono text-xs text-right">{s.value}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* Legal Framework */}
          <Section icon={Scale} title="Legal Framework">
            <p className="text-sm text-secondary-foreground leading-relaxed whitespace-pre-line">
              {country.legalFramework}
            </p>
          </Section>

          {/* Refugee Admissions */}
          <Section icon={Shield} title="Refugee Admissions">
            <p className="text-sm text-secondary-foreground leading-relaxed whitespace-pre-line">
              {country.refugeeAdmissions}
            </p>
          </Section>

          {/* Enforcement */}
          <Section icon={Swords} title="Enforcement Policies">
            <p className="text-sm text-secondary-foreground leading-relaxed whitespace-pre-line">
              {country.enforcementPolicies}
            </p>
          </Section>

          {/* Military Displacement */}
          {country.militaryDisplacement !== "N/A" && (
            <Section icon={AlertTriangle} title="Military Displacement Footprint">
              <p className="text-sm text-secondary-foreground leading-relaxed whitespace-pre-line">
                {country.militaryDisplacement}
              </p>
            </Section>
          )}

          {/* Economic Impact */}
          <Section icon={TrendingUp} title="Economic Impact">
            <p className="text-sm text-secondary-foreground leading-relaxed whitespace-pre-line">
              {country.economicImpact}
            </p>
          </Section>

          {/* Hypocrisy Index */}
          <Section icon={AlertTriangle} title="Hypocrisy Index (For Debate)">
            <div className="grid gap-2 bg-muted/30 rounded-lg p-3 border border-border/50">
              {country.hypocrisyIndex.map((h, i) => (
                <div key={i} className="flex justify-between items-start gap-4 text-sm">
                  <span className="text-muted-foreground">{h.label}</span>
                  <span className="text-foreground font-mono text-xs text-right font-bold">{h.value}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* Debate Points */}
          <Section icon={MessageSquareQuote} title="Top Debate Points for Oman">
            <div className="space-y-3">
              {country.debatePoints.map((p, i) => (
                <div key={i} className="p-3 rounded bg-primary/5 border border-primary/20">
                  <span className="font-mono text-xs text-primary mr-2">{i + 1}.</span>
                  <span className="text-sm text-secondary-foreground">{p}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* Sources */}
          <Section icon={BookOpen} title="Sources">
            <ul className="text-xs text-muted-foreground space-y-1">
              {country.sources.map((s, i) => (
                <li key={i}>• {s}</li>
              ))}
            </ul>
          </Section>
        </CardContent>
      )}
    </Card>
  );
}

export default function CountryFactSheetsPage() {
  const [filter, setFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filtered = countryFactSheets.filter((c) => {
    const matchesText =
      c.name.toLowerCase().includes(filter.toLowerCase()) ||
      c.overview.toLowerCase().includes(filter.toLowerCase());
    const matchesCategory = categoryFilter === "all" || c.category === categoryFilter;
    return matchesText && matchesCategory;
  });

  const allies = filtered.filter((c) => c.category === "ally");
  const opposition = filtered.filter((c) => c.category === "opposition");
  const complex = filtered.filter((c) => c.category === "complex");

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-display font-bold flex items-center gap-2">
          <Globe className="h-6 w-6 text-primary" />
          Country Fact Sheets
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Detailed immigration profiles for key countries — prepared for Oman's delegation
        </p>
      </div>

      <div className="flex gap-3 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search countries..."
            className="bg-muted border-border pl-9"
          />
        </div>
        <div className="flex gap-1">
          {["all", "ally", "opposition", "complex"].map((cat) => (
            <Button
              key={cat}
              size="sm"
              variant={categoryFilter === cat ? "default" : "outline"}
              onClick={() => setCategoryFilter(cat)}
              className="text-xs capitalize"
            >
              {cat === "all" ? "All" : categoryLabels[cat]}
            </Button>
          ))}
        </div>
      </div>

      {allies.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-display font-bold text-green-400 uppercase tracking-wider">
            Allies
          </h2>
          {allies.map((c) => (
            <CountryCard key={c.name} country={c} />
          ))}
        </div>
      )}

      {complex.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-display font-bold text-yellow-400 uppercase tracking-wider">
            Complex Relationships
          </h2>
          {complex.map((c) => (
            <CountryCard key={c.name} country={c} />
          ))}
        </div>
      )}

      {opposition.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-display font-bold text-red-400 uppercase tracking-wider">
            Opposition
          </h2>
          {opposition.map((c) => (
            <CountryCard key={c.name} country={c} />
          ))}
        </div>
      )}
    </div>
  );
}
