import { useMemo, useState } from "react";
import { Search, Camera } from "lucide-react";
import MealCard from "./MealCard";

const FOODS = [
  { name: "Chicken Breast (100g)", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { name: "Brown Rice (1 cup)", calories: 216, protein: 5, carbs: 45, fat: 1.8 },
  { name: "Greek Yogurt (170g)", calories: 100, protein: 17, carbs: 6, fat: 0 },
  { name: "Banana (1 medium)", calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
  { name: "Olive Oil (1 tbsp)", calories: 119, protein: 0, carbs: 0, fat: 14 },
];

function nanoMealPlan({ calories, prefs }) {
  const proteinBias = prefs?.join(" ").toLowerCase().includes("protein");
  const target = calories || 2000;
  const meal = (name, c, p, carb, f) => ({ name, calories: c, protein: p, carbs: carb, fat: f });
  const base = [
    meal("Oats + Yogurt + Berries", 420, proteinBias ? 28 : 18, 55, 10),
    meal("Chicken, Rice & Greens", 620, proteinBias ? 48 : 35, 70, 14),
    meal("Salmon & Quinoa Bowl", 680, proteinBias ? 42 : 32, 55, 28),
  ];
  const total = base.reduce((a,m)=>a+m.calories,0);
  const snackCal = Math.max(0, Math.round(target - total));
  const plan = base.concat(snackCal>0? [meal("High-protein Snack", snackCal, proteinBias?20:10, 20, 8)] : []);
  return plan;
}

export default function NutritionScreen({ user, onPlanReady }) {
  const [query, setQuery] = useState("");
  const [logged, setLogged] = useState([]);
  const filtered = useMemo(() => FOODS.filter(f => f.name.toLowerCase().includes(query.toLowerCase())), [query]);
  const plan = useMemo(() => nanoMealPlan({ calories: user.dailyCalorieGoal, prefs: user.dietaryPrefs }), [user.dailyCalorieGoal, user.dietaryPrefs]);

  const totals = logged.reduce((a,f)=>({
    calories: a.calories + f.calories,
    protein: a.protein + f.protein,
    carbs: a.carbs + f.carbs,
    fat: a.fat + f.fat,
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

  const handleScan = async () => {
    alert("Barcode scanner placeholder. Integrate a scanning library or native module here.");
  };

  return (
    <section className="p-4 space-y-4">
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Today's Calories</h3>
          <button onClick={handleScan} className="px-3 py-2 rounded-lg bg-[#FFB347] text-white text-xs font-medium flex items-center gap-2">
            <Camera size={16} /> Scan Barcode
          </button>
        </div>
        <div className="mt-3">
          <div className="flex items-end justify-between text-sm">
            <span className="text-gray-600">{totals.calories} kcal</span>
            <span className="text-gray-600">Goal: {user.dailyCalorieGoal} kcal</span>
          </div>
          <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden" aria-hidden>
            <div className="h-full bg-[#008080]" style={{ width: `${Math.min(100, (totals.calories / user.dailyCalorieGoal) * 100)}%` }} />
          </div>
          <div className="mt-2 grid grid-cols-3 text-xs text-gray-600">
            <span>Protein: {totals.protein}g</span>
            <span>Carbs: {totals.carbs}g</span>
            <span>Fat: {totals.fat}g</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">AI Meal Plan</h3>
          <button onClick={onPlanReady} className="text-xs text-[#008080] font-medium">Save</button>
        </div>
        <div className="space-y-3">
          {plan.map((m, i) => (
            <MealCard key={i} meal={{ ...m, tag: i===0?"Breakfast":i===1?"Lunch":i===2?"Dinner":"Snack" }} onAdd={() => setLogged(prev => [...prev, m])} />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Food Database</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            value={query}
            onChange={e=>setQuery(e.target.value)}
            placeholder="Search foods"
            aria-label="Search foods"
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#008080]/30"
          />
        </div>
        <ul className="grid grid-cols-1 gap-3">
          {filtered.map((f, idx) => (
            <li key={idx} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center justify-between">
              <div>
                <h4 className="font-medium text-sm">{f.name}</h4>
                <p className="text-xs text-gray-500">{f.calories} kcal • {f.protein}g P • {f.carbs}g C • {f.fat}g F</p>
              </div>
              <button className="px-3 py-2 rounded-lg border border-gray-200 text-xs" onClick={() => setLogged(prev => [...prev, f])}>Log</button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
