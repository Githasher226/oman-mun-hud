import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Send, User, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Draft a preambulatory clause on migrant worker rights",
  "What's Oman's position on the Global Compact for Migration?",
  "Suggest allies for a resolution on labor migration",
  "Help me respond to criticism of the Kafala system",
  "What motions should I use to narrow the topic?",
];

export default function AIAdvisorPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMsg: Msg = { role: "user", content: text.trim() };
    const allMessages = [...messages, userMsg];
    setMessages(allMessages);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";

    try {
      const resp = await supabase.functions.invoke("chat", {
        body: { messages: allMessages },
      });

      // Handle non-streaming response (error cases)
      if (resp.error) {
        throw new Error(resp.error.message || "Failed to connect to AI");
      }

      // Check if response is a ReadableStream (streaming)
      if (resp.data instanceof ReadableStream) {
        const reader = resp.data.getReader();
        const decoder = new TextDecoder();
        let textBuffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          textBuffer += decoder.decode(value, { stream: true });

          let newlineIndex: number;
          while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
            let line = textBuffer.slice(0, newlineIndex);
            textBuffer = textBuffer.slice(newlineIndex + 1);
            if (line.endsWith("\r")) line = line.slice(0, -1);
            if (line.startsWith(":") || line.trim() === "") continue;
            if (!line.startsWith("data: ")) continue;

            const jsonStr = line.slice(6).trim();
            if (jsonStr === "[DONE]") break;

            try {
              const parsed = JSON.parse(jsonStr);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                assistantSoFar += content;
                setMessages((prev) => {
                  const last = prev[prev.length - 1];
                  if (last?.role === "assistant") {
                    return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantSoFar } : m);
                  }
                  return [...prev, { role: "assistant", content: assistantSoFar }];
                });
              }
            } catch {
              textBuffer = line + "\n" + textBuffer;
              break;
            }
          }
        }
      } else if (resp.data?.error) {
        throw new Error(resp.data.error);
      } else if (typeof resp.data === "string") {
        // Try parsing as text with SSE lines
        const lines = resp.data.split("\n");
        for (const rawLine of lines) {
          const line = rawLine.trim();
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) assistantSoFar += content;
          } catch { /* skip */ }
        }
        if (assistantSoFar) {
          setMessages((prev) => [...prev, { role: "assistant", content: assistantSoFar }]);
        }
      }

      if (!assistantSoFar) {
        setMessages((prev) => [...prev, { role: "assistant", content: "I'm sorry, I couldn't generate a response. Please try again." }]);
      }
    } catch (e: any) {
      console.error("AI error:", e);
      toast({ title: "AI Error", description: e.message || "Something went wrong", variant: "destructive" });
      setMessages((prev) => [...prev, { role: "assistant", content: "⚠️ Error: " + (e.message || "Failed to get response") }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3rem)] max-w-4xl">
      <div className="flex items-center gap-2 mb-4">
        <Bot className="h-5 w-5 text-primary" />
        <h1 className="text-2xl font-display font-bold">AI Advisor</h1>
        <span className="text-xs text-muted-foreground ml-2">MUN Strategy Assistant for Oman</span>
      </div>

      <Card className="flex-1 flex flex-col bg-card border-border overflow-hidden">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
              <div className="space-y-2">
                <Bot className="h-10 w-10 text-primary mx-auto" />
                <h2 className="text-lg font-display font-semibold">Oman's MUN Advisor</h2>
                <p className="text-sm text-muted-foreground max-w-md">
                  Ask about Oman's positions, draft clauses, strategize alliances, or get procedural guidance.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 max-w-lg">
                {SUGGESTIONS.map((s) => (
                  <Button
                    key={s}
                    variant="outline"
                    size="sm"
                    className="text-xs border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
                    onClick={() => send(s)}
                  >
                    {s}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
              {msg.role === "assistant" && (
                <div className="flex-shrink-0 mt-1">
                  <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/50 text-foreground"
                }`}
              >
                {msg.content}
              </div>
              {msg.role === "user" && (
                <div className="flex-shrink-0 mt-1">
                  <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              )}
            </div>
          ))}

          {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
            <div className="flex gap-3">
              <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div className="bg-muted/50 rounded-lg px-3 py-2">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
              </div>
            </div>
          )}
        </div>

        <div className="p-3 border-t border-border">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
              placeholder="Ask your MUN advisor..."
              className="bg-muted/30 border-border/50 text-sm min-h-[40px] max-h-[120px] resize-none"
              rows={1}
            />
            <Button
              onClick={() => send(input)}
              disabled={isLoading || !input.trim()}
              size="icon"
              className="bg-primary text-primary-foreground hover:bg-primary/80 flex-shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
