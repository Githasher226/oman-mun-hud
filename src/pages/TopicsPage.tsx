import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, BookOpen, Star, Trash2 } from "lucide-react";

interface Topic {
  id: string;
  name: string;
  notes: string;
  active: boolean;
}

const initialTopics: Topic[] = [
  { id: "1", name: "Immigration Enforcement & Due Process", notes: "Methods of enforcement, deportation safety, legal rights of accused migrants per UDHR.", active: false },
  { id: "2", name: "Refugee Protection & Resettlement", notes: "1951 Refugee Convention, 1967 Protocol, Global Compact on Refugees (2018). 100M+ displaced.", active: false },
  { id: "3", name: "Economic Impacts of Migration", notes: "Workforce gaps, aging populations, GDP contributions, fiscal effects. Case: Germany.", active: false },
  { id: "4", name: "Social Integration & Cultural Impact", notes: "Language barriers, education, diversity. Cases: Toronto (50% immigrants), France (post-2015 racism).", active: false },
  { id: "5", name: "Labor Rights of Migrant Workers", notes: "2nd Committee focus. Worker protections, exploitation, wage standards.", active: false },
];

export default function TopicsPage() {
  const [topics, setTopics] = useState<Topic[]>(initialTopics);
  const [newName, setNewName] = useState("");

  const addTopic = () => {
    if (!newName.trim()) return;
    setTopics([...topics, { id: Date.now().toString(), name: newName, notes: "", active: false }]);
    setNewName("");
  };

  const setActive = (id: string) => {
    setTopics(topics.map((t) => ({ ...t, active: t.id === id })));
  };

  const updateNotes = (id: string, notes: string) => {
    setTopics(topics.map((t) => (t.id === id ? { ...t, notes } : t)));
  };

  const removeTopic = (id: string) => {
    setTopics(topics.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-display font-bold">Topic Breakdown</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Immigration must be narrowed to subtopics — track and prepare for each
        </p>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Add a new subtopic..."
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTopic()}
          className="bg-muted border-border"
        />
        <Button onClick={addTopic} size="sm" className="bg-primary text-primary-foreground hover:bg-primary/80">
          <Plus className="h-4 w-4 mr-1" /> Add
        </Button>
      </div>

      <div className="space-y-3">
        {topics.map((topic) => (
          <Card
            key={topic.id}
            className={`bg-card border transition-all ${
              topic.active ? "border-primary shadow-lg shadow-primary/5" : "border-border"
            }`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-display flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  {topic.name}
                </CardTitle>
                <div className="flex items-center gap-2">
                  {topic.active && (
                    <Badge className="bg-primary text-primary-foreground text-xs">
                      ACTIVE
                    </Badge>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setActive(topic.id)}
                    className={topic.active ? "text-primary" : "text-muted-foreground"}
                  >
                    <Star className="h-4 w-4" fill={topic.active ? "currentColor" : "none"} />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => removeTopic(topic.id)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={topic.notes}
                onChange={(e) => updateNotes(topic.id, e.target.value)}
                placeholder="Add notes for this subtopic..."
                className="bg-muted/30 border-border/50 text-sm min-h-[60px] resize-none"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
