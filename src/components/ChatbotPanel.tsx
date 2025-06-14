
import * as React from "react";
import { Bot, User, FileInput } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useFileApplicantDataContext } from "./AIPanel";

type Message = { from: "human" | "ai", content: string };

const mockWelcome = "How can I assist you with this subsidy application?";
const mockResponse =
  "Based on the provided documents, this application may require escalation due to missing information. Would you like more details?";

const ChatbotPanel = () => {
  const [messages, setMessages] = React.useState<Message[]>([
    { from: "ai", content: mockWelcome }
  ]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const { processFile, resetData } = useFileApplicantDataContext();

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { from: "human", content: input.trim() }]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { from: "ai", content: mockResponse }
      ]);
      setLoading(false);
      toast({
        title: "AI Agent responded",
        description: mockResponse,
      });
    }, 900);
  };

  // File Upload logic
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files?.[0];
    if (file) {
      processFile(file);
      toast({
        title: "File uploaded",
        description: `"${file.name}" was uploaded and processed.`,
      });
    }
    evt.target.value = "";
  };

  return (
    <section className="flex flex-col h-full bg-white rounded-xl border border-border shadow-md">
      <div className="flex items-center gap-2 p-4 border-b border-border">
        <Bot className="w-5 h-5 text-green-600" />
        <h2 className="font-semibold text-lg flex-1">AI Chat</h2>
        <span className="text-xs text-muted-foreground">Agent online</span>
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              "flex",
              msg.from === "ai" ? "justify-start" : "justify-end"
            )}
          >
            <div
              className={cn(
                "max-w-[70%] px-4 py-2 rounded-xl",
                msg.from === "ai"
                  ? "bg-secondary text-primary"
                  : "bg-blue-50 text-primary"
              )}
            >
              <span className="text-sm">{msg.content}</span>
            </div>
            <div className="flex items-end ml-2">
              {msg.from === "ai" ? (
                <Bot className="w-4 h-4 text-green-700 mb-0.5" />
              ) : (
                <User className="w-4 h-4 text-gray-500 mb-0.5" />
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-secondary px-4 py-2 rounded-xl text-muted-foreground text-sm animate-pulse">
              AI is typing...
            </div>
          </div>
        )}
      </div>
      {/* Chat input + File Upload */}
      <form
        className="flex gap-2 p-4 border-t border-border items-center"
        onSubmit={handleSend}
      >
        <input
          className="flex-1 outline-none px-4 py-2 rounded-md border border-border bg-muted"
          type="text"
          placeholder="Type your question about the subsidy case…"
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={loading}
        />
        <Button
          type="button"
          variant="secondary"
          className="flex gap-2 items-center px-3 py-2"
          onClick={handleFileButtonClick}
          disabled={loading}
        >
          <FileInput className="w-4 h-4" />
          Upload File
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          accept=".csv"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <button
          className="bg-blue-700 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-800 transition-colors disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          Send
        </button>
      </form>
    </section>
  );
};

export default ChatbotPanel;
