import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Plus, Search, Trash2 } from "lucide-react";

interface Source {
  id: string;
  title: string;
  summary: string;
  url: string;
  category: string;
}

const initialSources: Source[] = [
  {
    id: "1", title: "UN Declaration of Human Rights (1948)", summary: "Foundational document establishing universal rights. Article 14 covers right to seek asylum. Relevant to enforcement and due process debates.",
    url: "https://www.un.org/en/about-us/universal-declaration-of-human-rights", category: "Treaty",
  },
  {
    id: "2", title: "1951 Refugee Convention", summary: "Defines who is a refugee and their rights. Establishes non-refoulement principle — cannot return refugees to danger.",
    url: "https://www.unhcr.org/about-unhcr/who-we-are/1951-refugee-convention", category: "Convention",
  },
  {
    id: "3", title: "1967 Protocol Relating to Status of Refugees", summary: "Removed geographic and temporal limitations of the 1951 Convention, making it universally applicable.",
    url: "https://www.unhcr.org/media/protocol-relating-status-refugees", category: "Protocol",
  },
  {
    id: "4", title: "Global Compact for Safe, Orderly and Regular Migration (2018)", summary: "Non-binding framework covering all dimensions of international migration. 23 objectives for better managing migration.",
    url: "https://www.un.org/en/migration/global-compact-for-safe-orderly-regular-migration", category: "Compact",
  },
  {
    id: "5", title: "Global Compact on Refugees (2018)", summary: "Adopted by GA to improve international cooperation on refugees. Emphasizes responsibility-sharing.",
    url: "https://www.unhcr.org/about-unhcr/who-we-are/global-compact-refugees", category: "Compact",
  },
  {
    id: "6", title: "Int'l Convention on Migrant Workers' Rights (1990)", summary: "Protects rights of all migrant workers and their families. Many Western nations have not ratified.",
    url: "https://www.ohchr.org/en/instruments-mechanisms/instruments/international-convention-protection-rights-all-migrant-workers", category: "Convention",
  },
];

export default function ResearchPage() {
  const [sources, setSources] = useState<Source[]>(initialSources);
  const [newTitle, setNewTitle] = useState("");
  const [newSummary, setNewSummary] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [filter, setFilter] = useState("");

  const addSource = () => {
    if (!newTitle.trim()) return;
    setSources([...sources, { id: Date.now().toString(), title: newTitle, summary: newSummary, url: newUrl, category: newCategory || "Other" }]);
    setNewTitle(""); setNewSummary(""); setNewUrl(""); setNewCategory("");
  };

  const filtered = sources.filter((s) =>
    s.title.toLowerCase().includes(filter.toLowerCase()) ||
    s.summary.toLowerCase().includes(filter.toLowerCase()) ||
    s.category.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-display font-bold">Research & Sources</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Treaties, resolutions, and policies relevant to immigration debate
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search sources..."
          className="bg-muted border-border pl-9"
        />
      </div>

      <div className="space-y-3">
        {filtered.map((source) => (
          <Card key={source.id} className="bg-card border-border">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-display text-foreground">{source.title}</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">{source.category}</Badge>
                  <Button size="sm" variant="ghost" onClick={() => setSources(sources.filter((s) => s.id !== source.id))} className="text-muted-foreground hover:text-destructive h-6 w-6 p-0">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{source.summary}</p>
              {source.url && (
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline inline-flex items-center gap-1">
                  <ExternalLink className="h-3 w-3" /> View Source
                </a>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-display text-primary">Add New Source</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Title" className="bg-muted border-border text-sm" />
          <Textarea value={newSummary} onChange={(e) => setNewSummary(e.target.value)} placeholder="Short summary..." className="bg-muted border-border text-sm min-h-[50px] resize-none" />
          <div className="flex gap-2">
            <Input value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder="URL" className="bg-muted border-border text-sm flex-1" />
            <Input value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="Category" className="bg-muted border-border text-sm w-32" />
          </div>
          <Button onClick={addSource} size="sm" className="bg-primary text-primary-foreground hover:bg-primary/80">
            <Plus className="h-4 w-4 mr-1" /> Add Source
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
