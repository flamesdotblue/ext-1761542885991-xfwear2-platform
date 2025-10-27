import ProgressRing from "./ProgressRing";

export default function HomeScreen({ user, onQuickStart }) {
  const stats = {
    calories: { current: 890, goal: user.dailyCalorieGoal },
    steps: { current: 6240, goal: 9000 },
    workout: { current: 1, goal: 1 },
  };
  const calPct = Math.min(100, (stats.calories.current / stats.calories.goal) * 100);
  const stepPct = Math.min(100, (stats.steps.current / stats.steps.goal) * 100);
  const workoutPct = Math.min(100, (stats.workout.current / stats.workout.goal) * 100);

  return (
    <section className="p-4 space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs text-gray-500">Welcome back</p>
          <h2 className="text-lg font-semibold">{user.name}</h2>
        </div>
        <button onClick={onQuickStart} className="px-3 py-2 rounded-lg bg-[#FFB347] text-white text-xs font-medium active:scale-[.99]">Quick Start</button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-xl border border-gray-100 p-3 text-center">
          <ProgressRing progress={calPct} label="Calories" />
          <div className="mt-2 text-xs text-gray-600">Calories</div>
          <div className="text-sm font-semibold">{stats.calories.current}/{stats.calories.goal}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-3 text-center">
          <ProgressRing progress={stepPct} color="#FFB347" label="Steps" />
          <div className="mt-2 text-xs text-gray-600">Steps</div>
          <div className="text-sm font-semibold">{stats.steps.current}/{stats.steps.goal}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-3 text-center">
          <ProgressRing progress={workoutPct} color="#10b981" label="Workout" />
          <div className="mt-2 text-xs text-gray-600">Workout</div>
          <div className="text-sm font-semibold">{stats.workout.current}/{stats.workout.goal}</div>
        </div>
      </div>

      <div className="bg-[#008080] text-white rounded-xl p-4">
        <h3 className="font-semibold">Tip of the day</h3>
        <p className="text-sm mt-1 text-teal-50">Aim for 25-30g of protein per meal to improve satiety and recovery.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <h3 className="font-semibold">This week</h3>
        <div className="mt-3 grid grid-cols-7 gap-2">
          {["M","T","W","T","F","S","S"].map((d,i)=>{
            const done = i % 2 === 0;
            return (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className={`w-8 h-16 rounded-lg border ${done?"bg-[#008080] border-[#007070]":"bg-gray-50 border-gray-200"}`} />
                <span className="text-[10px] text-gray-600">{d}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
