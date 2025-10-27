import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";

function nanoCoachReply(message, context) {
  const lc = message.toLowerCase();
  if (lc.includes("protein")) return "Aim for 1.6–2.2 g/kg of bodyweight daily. Consider Greek yogurt, lean meats, and legumes.";
  if (lc.includes("workout") || lc.includes("routine")) return `Based on your ${context.level} level and goal to ${context.goal}, try 3 days: Full-body A/B split with focus on compound lifts.`;
  if (lc.includes("plateau")) return "Try increasing training volume by 10% and tighten calorie tracking for 1-2 weeks. Deload if fatigued.";
  return "I’m here to help with training, nutrition, recovery, and motivation. Ask me anything!";
}

export default function AICoachScreen({ user, onUpdateUser }) {
  const [messages, setMessages] = useState([
    { role: "assistant", content: `Hi ${user.name}! I’m your AI Coach. What’s your focus today?` },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTimeout(() => {
      const reply = nanoCoachReply(userMsg.content, user);
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    }, 400);
  };

  return (
    <section className="flex flex-col h-full p-4">
      <div className="flex-1 overflow-y-auto space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`max-w-[85%] ${m.role === "assistant" ? "bg-[#008080]/10 text-gray-800 ml-0" : "bg-[#FFB347]/20 text-gray-800 ml-auto"} rounded-2xl px-3 py-2 text-sm`}>
            {m.content}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="mt-3 flex items-center gap-2">
        <input
          value={input}
          onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>{ if(e.key==='Enter') send(); }}
          aria-label="Message AI Coach"
          placeholder="Ask about workouts, meals, progress..."
          className="flex-1 px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#008080]/30"
        />
        <button onClick={send} className="p-2 rounded-lg bg-[#008080] text-white active:scale-[.98]" aria-label="Send message">
          <Send size={18} />
        </button>
      </div>
      <div className="mt-3 text-[11px] text-gray-500">
        Coaching plans: Beginner • Fat Loss • Muscle Gain. Customize in Profile to refine recommendations.
      </div>
    </section>
  );
}
