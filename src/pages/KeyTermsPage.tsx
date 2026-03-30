import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookOpen, Search } from "lucide-react";
import { keyTerms } from "@/data/omanResearch";

export default function KeyTermsPage() {
  const [filter, setFilter] = useState("");

  const filtered = keyTerms.filter(
    (t) =>
      t.term.toLowerCase().includes(filter.toLowerCase()) ||
      t.definition.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-display font-bold flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          Key Terms
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Essential terminology for MUN immigration debates
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search terms..."
          className="bg-muted border-border pl-9"
        />
      </div>

      <div className="grid gap-3">
        {filtered.map((item) => (
          <Card key={item.term} className="bg-card border-border">
            <CardContent className="p-4">
              <h3 className="text-sm font-display font-bold text-primary mb-1">
                {item.term}
              </h3>
              <p className="text-sm text-secondary-foreground leading-relaxed">
                {item.definition}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
