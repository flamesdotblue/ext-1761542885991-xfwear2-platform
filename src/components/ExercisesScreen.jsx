import { useMemo, useState } from "react";
import { Search, Filter } from "lucide-react";
import WorkoutCard from "./WorkoutCard";

const EXERCISES = [
  { name: "Push-up", muscle: "Chest", level: "Beginner", video: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" },
  { name: "Squat", muscle: "Legs", level: "Beginner", video: "https://www.youtube.com/watch?v=1oed-UmAxFs" },
  { name: "Plank", muscle: "Core", level: "Beginner", video: "https://www.youtube.com/watch?v=pSHjTRCQxIw" },
  { name: "Romanian Deadlift", muscle: "Hamstrings", level: "Intermediate", video: "https://www.youtube.com/watch?v=2SHsk9AzdjA" },
  { name: "Bent-over Row", muscle: "Back", level: "Intermediate", video: "https://www.youtube.com/watch?v=kBWAon7ItDw" },
  { name: "Overhead Press", muscle: "Shoulders", level: "Intermediate", video: "https://www.youtube.com/watch?v=qEwKCR5JCog" },
];

function nanoSuggestRoutine({ level, goal }) {
  const base = level?.toLowerCase() === "beginner" ? 3 : 5;
  const muscles = goal?.toLowerCase().includes("muscle") ? ["Chest","Back","Legs","Shoulders","Core"] : ["Full Body","Full Body","Full Body","Upper","Lower"];
  const duration = level?.toLowerCase() === "beginner" ? 25 : 40;
  return {
    name: `${level} ${goal} Plan`,
    duration,
    level,
    muscles: [...new Set(muscles)],
    exercises: EXERCISES.slice(0, base + 1),
  };
}

export default function ExercisesScreen({ user, onLogComplete }) {
  const [query, setQuery] = useState("");
  const [muscle, setMuscle] = useState("All");
  const muscles = useMemo(() => ["All", ...Array.from(new Set(EXERCISES.map(e=>e.muscle)))], []);

  const filtered = EXERCISES.filter(e =>
    (muscle === "All" || e.muscle === muscle) && e.name.toLowerCase().includes(query.toLowerCase())
  );

  const routine = useMemo(() => nanoSuggestRoutine({ level: user.level, goal: user.goal }), [user.level, user.goal]);

  return (
    <section className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            aria-label="Search exercises"
            value={query}
            onChange={e=>setQuery(e.target.value)}
            placeholder="Search exercises"
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#008080]/30"
          />
        </div>
        <div className="relative">
          <button className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm flex items-center gap-2">
            <Filter size={16} /> {muscle}
          </button>
          <select
            aria-label="Filter by muscle group"
            value={muscle}
            onChange={e=>setMuscle(e.target.value)}
            className="absolute inset-0 opacity-0"
          >
            {muscles.map(m => <option key={m}>{m}</option>)}
          </select>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold">Recommended Routine</h3>
        <WorkoutCard
          workout={routine}
          onStart={() => alert("Starting workout...")}
          onLog={() => { alert("Workout logged"); onLogComplete?.(); }}
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Exercise Library</h3>
        <ul className="grid grid-cols-1 gap-3">
          {filtered.map((e,idx) => (
            <li key={idx} className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{e.name}</h4>
                  <p className="text-xs text-gray-500">{e.muscle} • {e.level}</p>
                </div>
                <a
                  href={e.video}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-[#008080] font-medium"
                  aria-label={`Watch video for ${e.name}`}
                >Watch</a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
