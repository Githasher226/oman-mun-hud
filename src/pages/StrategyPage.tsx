import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flag, Shield, Globe, Scale, Scroll, Target, CheckCircle, XCircle } from "lucide-react";
import { omanPosition } from "@/data/omanResearch";

export default function StrategyPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-display font-bold flex items-center gap-2">
          <Flag className="h-6 w-6 text-primary" />
          Oman's Position on Immigration
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Comprehensive policy positions, treaties, and legal framework
        </p>
      </div>

      {/* Core Position */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-display flex items-center gap-2 text-primary">
            <Shield className="h-4 w-4" />
            Core Position
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-secondary-foreground leading-relaxed whitespace-pre-line">
            {omanPosition.corePosition}
          </p>
        </CardContent>
      </Card>

      {/* International Policies */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-display flex items-center gap-2 text-primary">
            <Globe className="h-4 w-4" />
            International Policies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-secondary-foreground leading-relaxed whitespace-pre-line">
            {omanPosition.internationalPolicies}
          </p>
        </CardContent>
      </Card>

      {/* Treaties */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-display flex items-center gap-2 text-primary">
            <Scroll className="h-4 w-4" />
            Treaties & Conventions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {omanPosition.treaties.map((t, i) => (
            <div key={i} className="p-3 rounded bg-muted/30 border border-border/50">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-display font-semibold text-foreground">{t.name}</h4>
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    t.status.toLowerCase().includes("not")
                      ? "border-destructive/50 text-destructive"
                      : t.status.toLowerCase().includes("selective")
                      ? "border-yellow-500/50 text-yellow-400"
                      : "border-green-500/50 text-green-400"
                  }`}
                >
                  {t.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{t.details}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Local Laws */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-display flex items-center gap-2 text-primary">
            <Scale className="h-4 w-4" />
            Local Laws on Immigration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-secondary-foreground leading-relaxed whitespace-pre-line">
            {omanPosition.localLaws.details}
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-xs font-display font-bold text-green-400 uppercase tracking-wider flex items-center gap-1">
                <CheckCircle className="h-3 w-3" /> What Migrants Are Allowed
              </h4>
              {omanPosition.localLaws.allowed.map((item, i) => (
                <div key={i} className="text-xs text-secondary-foreground p-2 rounded bg-green-900/10 border border-green-900/20">
                  {item}
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-display font-bold text-red-400 uppercase tracking-wider flex items-center gap-1">
                <XCircle className="h-3 w-3" /> What Migrants Are NOT Allowed
              </h4>
              {omanPosition.localLaws.notAllowed.map((item, i) => (
                <div key={i} className="text-xs text-secondary-foreground p-2 rounded bg-red-900/10 border border-red-900/20">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resolution Goals */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-display flex items-center gap-2 text-primary">
            <Target className="h-4 w-4" />
            Resolution Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {omanPosition.resolutionGoals.map((goal, i) => (
            <div key={i} className="flex items-start gap-2 p-2 rounded bg-muted/30 border border-border/50">
              <span className="font-mono text-xs text-primary mt-0.5">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-sm text-secondary-foreground flex-1">{goal}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
