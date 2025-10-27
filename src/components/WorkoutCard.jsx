import { PlayCircle } from "lucide-react";

export default function WorkoutCard({ workout, onStart, onLog }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold">{workout.name}</h3>
          <p className="text-xs text-gray-500 mt-0.5">{workout.level} • {workout.duration} min • {workout.muscles.join(", ")}</p>
        </div>
        <span className="text-[10px] px-2 py-1 rounded-full bg-[#FFB347]/20 text-[#a56200]">Suggested</span>
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs text-gray-600">
        <div className="flex -space-x-1" aria-hidden>
          {workout.exercises.slice(0,3).map((e, idx) => (
            <div key={idx} className="w-6 h-6 rounded-full bg-teal-50 border border-teal-100 grid place-items-center text-[10px] text-[#008080]">{idx+1}</div>
          ))}
        </div>
        <span>{workout.exercises.length} exercises</span>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <button onClick={onStart} className="flex-1 py-2 rounded-lg bg-[#008080] text-white text-sm font-medium flex items-center justify-center gap-2 active:scale-[.99]">
          <PlayCircle size={18} /> Start
        </button>
        <button onClick={onLog} className="px-3 py-2 rounded-lg border border-gray-200 text-sm active:scale-[.99]">Log</button>
      </div>
    </div>
  );
}
