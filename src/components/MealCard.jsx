export default function MealCard({ meal, onAdd }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">{meal.name}</h3>
          <p className="text-xs text-gray-500 mt-0.5">{meal.calories} kcal • {meal.protein}g P • {meal.carbs}g C • {meal.fat}g F</p>
        </div>
        {meal.tag && (
          <span className="text-[10px] px-2 py-1 rounded-full bg-[#FFB347]/20 text-[#a56200]">{meal.tag}</span>
        )}
      </div>
      {meal.note && <p className="text-xs text-gray-600 mt-2">{meal.note}</p>}
      <button onClick={onAdd} className="mt-3 w-full py-2 rounded-lg bg-[#008080] text-white text-sm font-medium active:scale-[.99]">Add to plan</button>
    </div>
  );
}
